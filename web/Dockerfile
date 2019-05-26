FROM node:11.12.0-alpine as builder
RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install
RUN npm install -g @angular/cli@7.3.7
COPY . /app
RUN ng build --output-path=dist

FROM nginx
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
