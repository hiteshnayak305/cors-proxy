#!/bin/bash
echo "Running post-create commands..."

minikube start --cpus=2 --memory=4096
minikube addons enable metrics-server
minikube addons enable ingress
minikube status
