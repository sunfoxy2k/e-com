FROM node:16.14.2-alpine AS base

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]
