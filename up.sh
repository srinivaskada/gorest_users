#!/bin/bash

# starting up
MAIN_DIR=$(pwd)

# users service
USERS_SERVICE="users-service"
docker build --ssh default -t gorest-${USERS_SERVICE}:latest -f ${MAIN_DIR}/${USERS_SERVICE}/Dockerfile .

# gorest service
GOREST_SERVICE="gorest-service"
docker build --ssh default -t gorest-${GOREST_SERVICE}:latest -f ${MAIN_DIR}/${GOREST_SERVICE}/Dockerfile .
#
cd ${MAIN_DIR}
docker-compose up --build --detach