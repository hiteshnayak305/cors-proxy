ARG BASE_IMAGE="ubuntu"

FROM mcr.microsoft.com/devcontainers/base:${BASE_IMAGE}

# Upgrade Image
RUN apt update && \
    apt -y upgrade && \
    apt clean
