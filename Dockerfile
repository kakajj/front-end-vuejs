# build stage
FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build

# production stage
FROM nginx:1.19.8-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html