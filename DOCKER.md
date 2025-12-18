# Docker Deployment for hk-edison

## Quick Start

### 1. Create Environment File

Copy `.env.example` to `.env.production` and update with production values:

```bash
cp .env.example .env.production
```

Or use the existing `example.env.local` as a reference.

### 2. Build Docker Image

```bash
docker build -t hk-edison:latest .
```

### 3. Run Container

```bash
docker run -d \
  --name hk-edison \
  -p 8000:8000 \
  --env-file .env.production \
  hk-edison:latest
```

### 4. Using Docker Compose

```bash
docker-compose up -d
```

## Environment Variables

Required environment variables (see `example.env.local` for full list):

- `MEDUSA_BACKEND_URL` - Your Medusa backend URL
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - Medusa publishable API key
- `NEXT_PUBLIC_BASE_URL` - Your storefront URL
- `NEXT_PUBLIC_DEFAULT_REGION` - Default region (ISO-2 format)

## Health Check

The container includes a health check. View status:

```bash
docker ps
```

## Logs

View container logs:

```bash
docker logs -f hk-edison
```

## Stop Container

```bash
docker stop hk-edison
docker rm hk-edison
```

For more detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
