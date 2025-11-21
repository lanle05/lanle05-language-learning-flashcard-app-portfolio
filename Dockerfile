FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

# Install all dependencies (including dev ones) to run the build
RUN npm install --legacy-peer-deps

RUN npm install ajv@8

COPY . .

# This creates a "build" folder with your production website
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]