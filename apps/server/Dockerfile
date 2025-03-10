FROM node:23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npx nx run server:build:production 


FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist/apps/server /app
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "main.js"]