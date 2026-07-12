# Stage 1: Build the Vite application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Expose port (Cloud Run will provide the PORT env variable, defaulting to 8080 if not set)
ENV PORT=8080
EXPOSE $PORT

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
