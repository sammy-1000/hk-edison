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

# Accept build arguments for NEXT_PUBLIC_* variables
# These are required at build time because Next.js embeds them in the bundle
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_STORE_PHONE
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_STORE_EMAIL
ARG NEXT_PUBLIC_SOCIAL_FACEBOOK
ARG NEXT_PUBLIC_SOCIAL_INSTAGRAM
ARG NEXT_PUBLIC_SOCIAL_TWITTER
ARG NEXT_PUBLIC_SOCIAL_LINKEDIN
ARG NEXT_PUBLIC_SOCIAL_TIKTOK
ARG MEDUSA_BACKEND_URL

# Set as environment variables for the build
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION
ENV NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY
ENV NEXT_PUBLIC_STORE_PHONE=$NEXT_PUBLIC_STORE_PHONE
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER
ENV NEXT_PUBLIC_STORE_EMAIL=$NEXT_PUBLIC_STORE_EMAIL
ENV NEXT_PUBLIC_SOCIAL_FACEBOOK=$NEXT_PUBLIC_SOCIAL_FACEBOOK
ENV NEXT_PUBLIC_SOCIAL_INSTAGRAM=$NEXT_PUBLIC_SOCIAL_INSTAGRAM
ENV NEXT_PUBLIC_SOCIAL_TWITTER=$NEXT_PUBLIC_SOCIAL_TWITTER
ENV NEXT_PUBLIC_SOCIAL_LINKEDIN=$NEXT_PUBLIC_SOCIAL_LINKEDIN
ENV NEXT_PUBLIC_SOCIAL_TIKTOK=$NEXT_PUBLIC_SOCIAL_TIKTOK
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL

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
