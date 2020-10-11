FROM node:alpine as dependencies
ARG SERVICE_NAME='gorest-service'
ARG APP_PORT
ARG GOREST_BASEURL
ARG GOREST_TOKEN

WORKDIR /var/www/
ADD ./shared ./shared

WORKDIR /var/www/${SERVICE_NAME}
COPY ./${SERVICE_NAME}/package.json ./
COPY ./${SERVICE_NAME}/package-lock.json ./

ADD ./${SERVICE_NAME}/node_modules/ ./node_modules/
# RUN npm ci --production

ADD ./${SERVICE_NAME}/src ./src

ENV APP_PORT=APP_PORT
ENV GOREST_BASEURL=GOREST_BASEURL
ENV GOREST_TOKEN=GOREST_TOKEN

CMD ["node", "./src/index.js"]