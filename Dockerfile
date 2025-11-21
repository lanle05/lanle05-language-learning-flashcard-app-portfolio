FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps && npm install react-scripts ajv@8 --legacy-peer-deps

COPY . .

# This creates a "build" folder with your production website
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]