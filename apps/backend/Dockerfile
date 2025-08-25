# Stage 1: Base image for building
FROM node:20-alpine AS base

# Stage 2: Builder stage - install dependencies
FROM base AS builder

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat python3 make g++

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY turbo.json ./
COPY apps/backend/package.json ./apps/backend/package.json

# Install dependencies
RUN npm install --force

# Copy the rest of the files
COPY . .

# Build the application
WORKDIR /app/apps/backend
RUN npm run build

# Stage 3: Production image
FROM base AS runner

# Install production dependencies
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

# Create app directory with proper permissions
RUN mkdir -p /app && chown -R node:node /app

# Copy necessary files with proper ownership
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/apps/backend/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/apps/backend/package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Switch to non-root user
USER node

# Command to run the application
CMD ["node", "dist/server.js"]
