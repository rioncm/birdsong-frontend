FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

ENV VITE_API_BASE_URL="https://api.birdsong.diy"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
