FROM oven/bun:latest

WORKDIR /app

COPY ./packages ./packages
COPY /package.json /package.json
COPY /bun.lock /bun.lock
COPY /turbo.json  /turbo.json

COPY /apps/ws /app/ws

COPY . .

RUN bun install

EXPOSE 8083 

CMD [ "bun","run","start:ws" ]
