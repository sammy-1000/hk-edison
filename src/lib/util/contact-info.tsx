/**
 * Utility functions to get contact information and social media links from environment variables
 */

export type SocialLink = {
  name: string
  url: string
  icon: React.ReactNode
}

/**
 * Get phone number from environment variable
 */
export function getPhoneNumber(): string {
  return process.env.NEXT_PUBLIC_STORE_PHONE || ""
}

/**
 * Get WhatsApp number from environment variable (falls back to phone number)
 */
export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || getPhoneNumber()
}

/**
 * Get email from environment variable
 */
export function getStoreEmail(): string {
  return process.env.NEXT_PUBLIC_STORE_EMAIL || ""
}

/**
 * Get social media links from environment variables
 * @param iconSize - Optional icon size class (default: "size-5")
 */
export function getSocialMediaLinks(iconSize: string = "size-5"): SocialLink[] {
  const links: SocialLink[] = []

  if (process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) {
    links.push({
      name: "Facebook",
      url: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      icon: (
        <svg className={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
        </svg>
      ),
    })
  }

  if (process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) {
    links.push({
      name: "Instagram",
      url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      icon: (
        <svg className={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
        </svg>
      ),
    })
  }

  if (process.env.NEXT_PUBLIC_SOCIAL_TWITTER) {
    links.push({
      name: "Twitter",
      url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
      icon: (
        <svg className={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
        </svg>
      ),
    })
  }

  if (process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) {
    links.push({
      name: "LinkedIn",
      url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      icon: (
        <svg className={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
        </svg>
      ),
    })
  }

  if (process.env.NEXT_PUBLIC_SOCIAL_TIKTOK) {
    links.push({
      name: "TikTok",
      url: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK,
      icon: (
        <svg className={iconSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
        </svg>
      ),
    })
  }

  return links
}

/**
 * Format phone number for WhatsApp URL (remove + and spaces)
 */
export function formatWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[\s\+]/g, "")
}

/**
 * Format phone number for tel: URL (remove spaces)
 */
export function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\s/g, "")
}

/**
 * Get WhatsApp URL
 */
export function getWhatsAppUrl(phoneNumber?: string): string {
  const number = phoneNumber || getWhatsAppNumber()
  return `https://wa.me/${formatWhatsAppNumber(number)}`
}

/**
 * Get tel: URL
 */
export function getPhoneUrl(phoneNumber?: string): string {
  const number = phoneNumber || getPhoneNumber()
  return `tel:${formatPhoneNumber(number)}`
}
