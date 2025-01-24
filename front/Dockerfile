# Use Node.js to build the app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use NGINX to serve the app
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ycata/browser /usr/share/nginx/html

# Restart NGINX
RUN rm -rf /var/cache/nginx/*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
