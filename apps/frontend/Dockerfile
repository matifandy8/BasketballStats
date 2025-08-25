# Stage 1: Base image for building
FROM node:20-alpine AS base

# Stage 2: Builder stage - install dependencies and build the app
FROM base AS builder

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Set working directory to frontend app
WORKDIR /app/apps/frontend

# Build the application
RUN npm run build

# Stage 3: Production image
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
