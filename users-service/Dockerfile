FROM node:alpine as dependencies
ARG SERVICE_NAME='users-service'
ARG APP_PORT

WORKDIR /var/www/
ADD ./shared ./shared

WORKDIR /var/www/${SERVICE_NAME}
COPY ./${SERVICE_NAME}/package.json ./
COPY ./${SERVICE_NAME}/package-lock.json ./

ADD ./${SERVICE_NAME}/node_modules/ ./node_modules/
ADD ./${SERVICE_NAME}/../client/build ./client-build/
# RUN npm ci --production

ADD ./${SERVICE_NAME}/src ./src

ENV APP_PORT=APP_PORT

CMD ["node", "./src/index.js"]