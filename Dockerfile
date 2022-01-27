FROM node:16-alpine3.11 as TEST
COPY package.json package-lock.json ./
RUN npm install
COPY . .
#RUN npm run test

FROM node:16-alpine3.11 as BUILD
LABEL org.opencontainers.image.source https://github.com/liatrio/libotrio
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production 
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "app.js"]
