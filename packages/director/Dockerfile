FROM node:12-alpine3.12

ARG AZDO_NPM_REGISTRY_PULL_TOKEN

WORKDIR /app

COPY package*.json  ./
COPY ./tools/connect-to-npm-registry-ci.sh ./tools/connect-to-npm-registry-ci.sh
RUN apk add curl
RUN ./tools/connect-to-npm-registry-ci.sh $AZDO_NPM_REGISTRY_PULL_TOKEN
RUN npm install

COPY src ./src
COPY config ./config
COPY .babelrc ./
COPY tsconfig.json ./

RUN npm run build

EXPOSE 1234
CMD [ "npm", "run", "start" ]