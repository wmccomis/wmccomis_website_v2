#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment on Proxmox VM..."

# Navigate to the project directory (GitHub Runner workspace)
PROJECT_DIR=$(dirname $(find ~/actions-runner -name "docker-compose.yml" | head -n 1))
cd "$PROJECT_DIR"

echo "📂 Project directory: $PROJECT_DIR"

# Build and restart containers
echo "🔨 Building and starting containers..."
docker compose down
docker compose up -d --build

echo "✅ Deployment successful!"
