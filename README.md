# EchoWarehouse Frontend






### Prerequisites

- Docker & Docker Compose installed, OR
- Node.js 18+ and npm

### Using Docker

#### Development with Hot Reload

```bash
docker-compose -f docker-compose.dev.yml up
```

Access the app at `http://localhost:3000`



#### Production Build

```bash
docker-compose up
```

Access the app at `http://localhost:3000`

### Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Environment Configuration

Create a `.env` file in the project root (based on `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

## Docker Detailed Guide

### File Structure

- **`Dockerfile`** - Multi-stage production image
- **`Dockerfile.dev`** - Development image with hot reload
- **`docker-compose.yml`** - Production container orchestration
- **`docker-compose.dev.yml`** - Development container orchestration
- **`.dockerignore`** - Files to exclude from Docker build context

### Development Workflow with Docker

```bash
# Start the development container
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose -f docker-compose.dev.yml logs -f frontend

# Stop the container
docker-compose -f docker-compose.dev.yml down

# Rebuild after package.json changes
docker-compose -f docker-compose.dev.yml up --build
```

### Production Deployment with Docker

```bash
# Build and run production image
docker-compose up -d

# View container status
docker ps

# Check health
docker-compose ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Docker Environment Variables

Configure in `docker-compose.yml` or pass at runtime:

```bash
# Override API base URL
docker-compose -e VITE_API_BASE_URL=http://api.example.com up
```

### Troubleshooting Docker

```bash
# Rebuild all images
docker-compose -f docker-compose.dev.yml build --no-cache

# Remove unused images and containers
docker system prune

# View container logs
docker-compose logs frontend

# Access container shell
docker exec -it echo-warehouse-frontend sh
```


## Building & Deployment

### Local Build

```bash
npm run build
npm run preview
```

### Docker Build

```bash
# Development image
docker build -f Dockerfile.dev -t echo-warehouse-frontend:dev .

# Production image
docker build -f Dockerfile -t echo-warehouse-frontend:latest .
```

### Docker Registry

```bash
# Tag for registry
docker tag echo-warehouse-frontend:latest myregistry/echo-warehouse-frontend:latest

# Push to registry
docker push myregistry/echo-warehouse-frontend:latest

# Pull and run
docker run -p 3000:3000 myregistry/echo-warehouse-frontend:latest
```

## API Integration

Configure your backend API endpoint:

**Development:**
```bash
VITE_API_BASE_URL=http://localhost:8000/api npm run dev
```

**Docker:**
Update `docker-compose.yml`:
```yaml
environment:
  - VITE_API_BASE_URL=http://backend:8000/api
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Common Docker Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View logs from last 100 lines
docker-compose logs --tail=100 frontend

# Rebuild specific service
docker-compose up --build frontend

# Remove all stopped containers
docker container prune

# Remove all dangling images
docker image prune

# Full cleanup
docker system prune -a
```

## Development Tips

- **Hot Reload**: Changes to `src/` are reflected instantly in dev mode
- **Type Checking**: Run TypeScript checks with `tsc`
- **Environment**: Copy `.env.example` to `.env` and customize

## License

See LICENSE file for details

## Support

For issues and questions, please refer to the project documentation or open an issue on GitHub.

