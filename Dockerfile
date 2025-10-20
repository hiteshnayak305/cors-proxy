# ---------------------------
# Stage 1: Build Stage
# ---------------------------
FROM node:25 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund --ignore-scripts

# Copy source code
COPY ./bin ./bin
COPY ./public ./public
COPY ./src ./src

# ---------------------------
# Stage 2: Production Stage
# ---------------------------
FROM node:25-alpine

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    ORIGIN="*" \
    LOG_LEVEL="info"

# Set working directory
WORKDIR /usr/src/app

# Copy only production dependencies from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy application files
COPY --from=builder /usr/src/app .

# Change ownership to non-root user
RUN chown -R app:app /usr/src/app

# Switch to non-root user
USER app

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "./bin/www"]