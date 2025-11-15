FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# NEW LINE: Force delete the package-lock.json
RUN rm -f package-lock.json

# SIMPLIFIED COMMAND:
RUN npm install --legacy-peer-deps --omit=dev

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]