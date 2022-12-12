FROM node:16-alpine as build-stage

WORKDIR /app


COPY package.json .

COPY yarn.lock .

RUN npm install


COPY . .

RUN npm run build
## các bạn có thể dùng yarn install .... tuỳ nhu cầu nhé

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]