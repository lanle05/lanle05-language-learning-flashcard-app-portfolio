FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --omit=dev --registry=https://registry.cloudflare.com --network-timeout=1000000

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]