#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

echo "🚀 Running post-start commands..."

# Install npm dependencies
echo "📦 Installing npm packages..."
npm install

# Update Helm chart dependencies
echo "📈 Updating Helm chart dependencies..."
helm dependency update ./charts/cors-proxy

# Docker build variables
IMAGE_NAME="cors-proxy"
IMAGE_TAG=$(openssl rand -hex 4)

# Build Docker image for linux/amd64
echo "🐳 Building Docker image..."
docker buildx build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} .

# Load Docker image into Minikube
echo "⛴️ Loading image into Minikube..."
minikube image load ${IMAGE_NAME}:${IMAGE_TAG}

# Helm release variables
NAMESPACE="cors-proxy"
RELEASE="cors-proxy"

# Uninstall Helm release if it exists
if helm status "$RELEASE" -n "$NAMESPACE" >/dev/null 2>&1; then
    echo "🗑️ Uninstalling existing Helm release '$RELEASE'..."
    helm uninstall "$RELEASE" -n "$NAMESPACE"

    echo "⏳ Waiting for Helm release '$RELEASE' to be fully removed..."
    while helm status "$RELEASE" -n "$NAMESPACE" >/dev/null 2>&1; do
        echo "⏱ Release still exists, waiting 3s..."
        sleep 3
    done
    echo "✅ Release uninstalled."
else
    echo "ℹ️ Helm release '$RELEASE' does not exist, skipping uninstall."
fi

# Install or upgrade Helm release
echo "⬆️ Installing/upgrading Helm release '$RELEASE'..."
helm upgrade --install "$RELEASE" ./charts/cors-proxy \
    --namespace "$NAMESPACE" --create-namespace \
    --set controllers.cors-proxy.containers.cors-proxy.image.repository=${IMAGE_NAME} \
    --set controllers.cors-proxy.containers.cors-proxy.image.tag=${IMAGE_TAG} \
    --set controllers.cors-proxy.containers.cors-proxy.image.pullPolicy=Never

# List all resources in the namespace
echo "🔍 Listing all resources in namespace '$NAMESPACE'..."
kubectl get all -n "$NAMESPACE"

echo "✅ Post-start commands completed successfully!"