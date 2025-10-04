#!/bin/bash
echo "Running post-start commands..."

npm install
docker buildx build --platform linux/amd64 -t cors-proxy:latest .
minikube image load cors-proxy:latest
helm dependency update ./charts/cors-proxy
helm upgrade --install cors-proxy ./charts/cors-proxy --namespace cors-proxy --create-namespace \
    --set controllers.cors-proxy.containers.cors-proxy.image.repository=cors-proxy \
    --set controllers.cors-proxy.containers.cors-proxy.image.tag=latest \
    --set controllers.cors-proxy.containers.cors-proxy.image.pullPolicy=Never
kubectl get all -n cors-proxy
