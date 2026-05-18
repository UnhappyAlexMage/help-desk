# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_ENABLE_MOCKS
ENV VITE_ENABLE_MOCKS=$VITE_ENABLE_MOCKS

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
# Copy the built assets from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]