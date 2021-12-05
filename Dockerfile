FROM node:12

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

RUN npm install



COPY . .
