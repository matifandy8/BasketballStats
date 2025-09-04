# Stage 1: Base image for building
FROM node:20-alpine AS base

# Stage 2: Builder stage - install dependencies
FROM base AS builder

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat python3 make g++

# Set working directory to the backend
WORKDIR /app/apps/backend

# Copy package files first for better caching
COPY package*.json ./
COPY ../../turbo.json ../../

# Install root dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --force

# Install backend dependencies
WORKDIR /app/apps/backend
RUN npm install --force

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production image
FROM base AS runner

WORKDIR /app/apps/backend

# Copy built application from builder
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
