FROM node:12-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

COPY src ./src

RUN npm install
RUN npm run build

CMD npm test
