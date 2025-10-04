#!/bin/bash
echo "Running post-create commands..."

# Check if Minikube is already running
if minikube status --format '{{.Host}}' | grep -q "Running"; then
    echo "Minikube is already running. Skipping initialization..."
else
    echo "Starting Minikube..."
    minikube start --cpus=2 --memory=4096
    minikube addons enable metrics-server
    minikube addons enable ingress
fi

# Show status regardless
minikube status

# Ensure permission on node_modules
sudo chown -R vscode:vscode /workspaces/cors-proxy/node_modules
