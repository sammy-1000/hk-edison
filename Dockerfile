# Multi-stage build for Next.js application
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

# Set working directory
WORKDIR /app

# Dependencies stage
FROM base AS deps
# Copy package files
COPY package.json pnpm-lock.yaml* ./
# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Build the application
RUN pnpm build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/check-env-variables.js ./check-env-variables.js

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 8000

ENV PORT=8000
ENV HOSTNAME="0.0.0.0"

CMD ["pnpm", "start"]
