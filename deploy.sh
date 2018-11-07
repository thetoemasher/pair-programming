#!/bin/sh

# cd ~/pair-programming

# git pull

docker network create pairs

docker run --name redis_server -d --network pairs redis

docker build -f Dockerfile-server-prod -t pairs-image .

docker stop pairs-container

docker rm pairs-container

docker run -d -p 4815:4815 --restart always --name pairs-container --link redis_server:redis_server --network pairs -i pairs-image

docker container prune -f

docker image prune -f