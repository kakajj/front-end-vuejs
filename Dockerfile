# build stage
FROM node:lts as build-stage
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

# production stage
FROM nginx:1.19.8-alpine
COPY ./nginx-config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]