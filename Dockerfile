FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN yarn install

COPY src/ ./src/
COPY public/ ./public/
COPY index.html vite.config.ts ./

RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN adduser -S portfolio -u 1001 -G nginx

RUN chown -R portfolio:nginx /usr/share/nginx/html && \
    chown -R portfolio:nginx /var/cache/nginx && \
    chown -R portfolio:nginx /var/log/nginx && \
    chown -R portfolio:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R portfolio:nginx /var/run/nginx.pid && \
    chmod 755 /var/log/nginx && \
    chmod 755 /var/cache/nginx

USER portfolio

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"] 