# Stage 1 — собираем Vite frontend
FROM node:18-alpine as build
WORKDIR /app
COPY ../deploywebtest/package*.json ./
RUN npm install
COPY ../deploywebtest .
RUN npm run build

# Stage 2 — nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
