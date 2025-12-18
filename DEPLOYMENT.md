# HK-Edison Storefront Deployment Guide

This guide covers deploying the Next.js storefront application (hk-edison).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker and Docker Compose installed
- Access to Medusa backend API
- Domain names and SSL certificates (for production)

## Environment Setup

### 1. Create Environment File

Copy `.env.example` to `.env.production`:

```bash
cp .env.example .env.production
```

### 2. Required Environment Variables

- `MEDUSA_BACKEND_URL` - Your Medusa backend URL (e.g., `https://api.yourstore.com`)
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - Medusa publishable API key
- `NEXT_PUBLIC_BASE_URL` - Your storefront URL (e.g., `https://yourstore.com`)
- `NEXT_PUBLIC_DEFAULT_REGION` - Default region (ISO-2 format, e.g., `us`)

### 3. Optional Environment Variables

- `NEXT_PUBLIC_STRIPE_KEY` - Stripe public key (if using Stripe)
- `REVALIDATE_SECRET` - Next.js revalidation secret
- `NEXT_PUBLIC_STORE_PHONE` - Store phone number
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp number
- `NEXT_PUBLIC_STORE_EMAIL` - Store email
- Social media links (Facebook, Instagram, Twitter, etc.)

## Docker Deployment

### Quick Start with Docker Compose

1. **Set up environment:**

   ```bash
   cp .env.example .env.production
   # Edit .env.production with your values
   ```

2. **Start the application:**

   ```bash
   docker-compose up -d
   ```

3. **Check logs:**

   ```bash
   docker logs -f hk-edison
   ```

### Manual Docker Build

1. **Build the image:**

   ```bash
   docker build -t hk-edison:latest .
   ```

2. **Run the container:**

   ```bash
   docker run -d \
     --name hk-edison \
     -p 8000:8000 \
     --env-file .env.production \
     hk-edison:latest
   ```

## Production Deployment

### Platform-Specific Guides

#### Vercel (Recommended for Next.js)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel handles build and deployment automatically
4. **Configure custom domain** (optional)

**Advantages:**

- Optimized for Next.js
- Automatic HTTPS
- Edge network
- Zero configuration needed

#### Railway/Render/Fly.io

1. Connect repository
2. Set environment variables
3. Platform handles Docker build and deployment
4. Configure custom domain

#### AWS/GCP/Azure

1. **Push image to container registry:**

   ```bash
   docker build -t your-registry/hk-edison:latest .
   docker push your-registry/hk-edison:latest
   ```

2. **Deploy using container services:**

   - AWS: ECS, App Runner, or Elastic Beanstalk
   - GCP: Cloud Run
   - Azure: Container Instances or App Service

3. **Configure load balancer and SSL**

#### DigitalOcean App Platform

1. Connect repository
2. Set environment variables
3. Platform handles deployment
4. Configure custom domain

#### Dokploy

1. **Connect your repository** to Dokploy
2. **Set Build Arguments** (required for build-time variables):
   - In Dokploy, go to your application settings
   - Navigate to "Build Arguments" or "Docker Build Args"
   - Add the following build arguments (these are required at build time):
     ```
     NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key
     NEXT_PUBLIC_BASE_URL=https://your-storefront-url.com
     NEXT_PUBLIC_DEFAULT_REGION=us
     ```
   - Optionally add other `NEXT_PUBLIC_*` variables if needed
3. **Set Runtime Environment Variables**:
   - In the "Environment Variables" section, set:
     ```
     MEDUSA_BACKEND_URL=https://your-medusa-backend-url.com
     REVALIDATE_SECRET=your_revalidation_secret
     ```
   - Note: `NEXT_PUBLIC_*` variables should be set as build arguments, not runtime env vars
4. **Deploy** - Dokploy will build and deploy your application

**Important**: `NEXT_PUBLIC_*` variables must be passed as **build arguments** because Next.js embeds them into the JavaScript bundle at build time. Regular environment variables won't work for these during the build process.

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
MEDUSA_BACKEND_URL=https://your-medusa-backend-url.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key
NEXT_PUBLIC_BASE_URL=https://your-storefront-url.com
NEXT_PUBLIC_DEFAULT_REGION=us
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
REVALIDATE_SECRET=your_revalidation_secret
```

## Health Checks

### Check Container Status

```bash
docker ps
```

### View Logs

```bash
docker logs -f hk-edison
```

### Test Application

```bash
curl http://localhost:8000
```

## Troubleshooting

### Container Won't Start

- Check environment variables are set correctly
- Verify Docker logs: `docker logs hk-edison`
- Ensure ports are not already in use

### Cannot Connect to Backend

- Verify `MEDUSA_BACKEND_URL` is correct
- Check backend is accessible from frontend
- Verify CORS settings on backend include frontend URL
- Check network connectivity

### Build Failures

- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for missing environment variables during build
- **For Dokploy**: Ensure `NEXT_PUBLIC_*` variables are set as **build arguments**, not just runtime environment variables
- Verify build arguments are correctly configured in your deployment platform

### CORS Errors

- Verify backend CORS settings include frontend URL
- Check `MEDUSA_BACKEND_URL` is correct
- Ensure URLs match exactly (including protocol)

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use HTTPS** in production
3. **Keep dependencies updated** regularly
4. **Use strong secrets** for `REVALIDATE_SECRET`
5. **Enable security headers** (handled by Next.js)
6. **Regular security audits** of dependencies
7. **Monitor logs** for suspicious activity

## Performance Optimization

### Next.js Optimizations

- Image optimization (automatic with Next.js Image component)
- Static page generation where possible
- API route caching
- Edge functions for dynamic content

### CDN Configuration

- Use Vercel Edge Network (if on Vercel)
- Configure CDN caching headers
- Optimize static assets

## Scaling Considerations

### Horizontal Scaling

- Next.js is stateless and can scale horizontally easily
- Use load balancer for multiple instances
- Consider edge functions for global distribution

### Caching Strategy

- Static pages cached at CDN level
- API routes can use ISR (Incremental Static Regeneration)
- Configure cache headers appropriately

## Support

For issues specific to:

- **Next.js**: https://nextjs.org/docs
- **Docker**: https://docs.docker.com
- **Medusa.js**: https://docs.medusajs.com
