
FROM node:10

RUN mkdir -p /home/www/backend

WORKDIR /home/www/backend

COPY ./backend /home/www/backend

RUN npm install

EXPOSE 3001