FROM node:18-alpine as build

WORKDIR /app

# Accept the API URL as a build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
# Copy the built dist folder from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure you have an nginx.conf to handle React Router paths
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]