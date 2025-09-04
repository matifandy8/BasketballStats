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

# Install root dependencies
RUN npm install --force

# Copy backend specific files
COPY apps/backend/package.json ./apps/backend/package.json

# Install backend dependencies
WORKDIR /app/apps/backend
RUN npm install --force

# Copy the rest of the files
WORKDIR /app
COPY . .

# Build the application
WORKDIR /app/apps/backend
RUN npm run build

# Stage 3: Production image
FROM base AS runner

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
