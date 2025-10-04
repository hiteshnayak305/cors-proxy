#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

echo "🚀 Running post-create commands..."

# Check if Minikube is already running
if minikube status --format '{{.Host}}' | grep -q "Running"; then
    echo "ℹ️ Minikube is already running. Skipping initialization..."
else
    echo "⚡ Starting Minikube..."
    minikube start --cpus=2 --memory=4096

    echo "🔧 Enabling Minikube addons..."
    minikube addons enable metrics-server
    minikube addons enable ingress
fi

# Show status regardless
echo "📊 Minikube status:"
minikube status

# Ensure permissions on node_modules
NODE_MODULES_PATH="/workspaces/cors-proxy/node_modules"
if [ -d "$NODE_MODULES_PATH" ]; then
    echo "🛠 Setting permissions on node_modules..."
    sudo chown -R vscode:vscode "$NODE_MODULES_PATH"
else
    echo "⚠️ Directory $NODE_MODULES_PATH does not exist. Skipping permission fix."
fi

echo "✅ Post-create commands completed successfully!"