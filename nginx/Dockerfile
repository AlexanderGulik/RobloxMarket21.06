FROM node:22 AS builder

WORKDIR /app

COPY ../roblox_frontend/package*.json ./

RUN npm install

COPY ../roblox_frontend/. .

RUN npm run build || exit 1

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]