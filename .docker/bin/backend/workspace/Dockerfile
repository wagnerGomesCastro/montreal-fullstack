# Common build stage
FROM node:22.15.0-alpine3.20

RUN apk update
RUN apk --update add --no-cache bash curl

# Essentials
RUN apk add -U tzdata
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install -g @nestjs/cli@11.0.0

WORKDIR /var/www

EXPOSE 3071

ENV HOST 0.0.0.0
