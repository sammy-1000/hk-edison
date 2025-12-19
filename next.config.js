const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

// Extract hostname from backend URL for image remote patterns
function getBackendHostname() {
  const backendUrl = process.env.MEDUSA_BACKEND_URL
  if (!backendUrl) return null
  
  try {
    const url = new URL(backendUrl)
    return url.hostname
  } catch {
    return null
  }
}

// Extract hostname from S3 file URL if provided
function getS3Hostname() {
  const s3FileUrl = process.env.S3_FILE_URL || process.env.NEXT_PUBLIC_S3_FILE_URL
  if (!s3FileUrl) return null
  
  try {
    const url = new URL(s3FileUrl)
    return url.hostname
  } catch {
    return null
  }
}

const backendHostname = getBackendHostname()
const s3Hostname = getS3Hostname()

// Build remote patterns dynamically
const remotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
  },
  {
    protocol: "https",
    hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
  },
  {
    protocol: "https",
    hostname: "medusa-server-testing.s3.amazonaws.com",
  },
  {
    protocol: "https",
    hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
  },
]

// Add backend hostname if available
if (backendHostname) {
  const backendProtocol = process.env.MEDUSA_BACKEND_URL?.startsWith('https') ? 'https' : 'http'
  remotePatterns.push({
    protocol: backendProtocol,
    hostname: backendHostname,
  })
}

// Add S3 hostname if available
if (s3Hostname) {
  remotePatterns.push({
    protocol: "https",
    hostname: s3Hostname,
  })
}

// Add common S3 regional patterns (Next.js doesn't support wildcards, so we add common ones)
// Users can add more via NEXT_PUBLIC_IMAGE_HOSTNAMES environment variable
const additionalHostnames = process.env.NEXT_PUBLIC_IMAGE_HOSTNAMES
if (additionalHostnames) {
  additionalHostnames.split(',').forEach(hostname => {
    const trimmed = hostname.trim()
    if (trimmed) {
      remotePatterns.push({
        protocol: "https",
        hostname: trimmed,
      })
      // Also add http version for development
      remotePatterns.push({
        protocol: "http",
        hostname: trimmed,
      })
    }
  })
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns,
  },
  // 👇 Add this block
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ]
  },
}

module.exports = nextConfig
