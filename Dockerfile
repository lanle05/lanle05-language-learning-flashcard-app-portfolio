FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --no-optional --registry=https://registry.cloudfare.com--network-timeout=1000000

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]