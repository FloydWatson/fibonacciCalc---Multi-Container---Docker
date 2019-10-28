# fibonacciCalc - Multi-Container - Docker

## Overview

This is an over the top fibonacci calculator. It will Utilize React, Express, Redis and Postgres.
The goal of this application is to better understand multi container deployment.

## Deploy

to deploy as dev

Client standalone:

        docker build -f Dockerfile.dev .
        docker run -p 3000:3000 "id"

Server standalone:

        docker build -f Dockerfile.dev .
        docker run "id"

Will result in err conn refused. This is because no pstgres server is running.

Worker standalone:

        docker build -f Dockerfile.dev .
        docker run "id"

docker compose

run from root:

        docker-compose up --build

note: if running on Windows 10 Home on docker cli, docker-compose up may cause errors. Currently the version of Virtual box that comes with docker cli does not support volumes.
As of yet I have not found a viable solution to this error.

First time starting may cause errors as dervices have not been built properly. try stopping it and starting again with:

        docker-compose up

If you edit files between deploys make sure you clear old services before deploying and re build with:

        docker-compose down
        docker-compose up --build


___

## Multi Container CI Workflow

1. Push code to github
2. TravisCI pulls repo
3. Travis builds TEST image, tests code
4. Travis builds PROD images
5. Travis pushes built PROD images to Docker Hub
6. Travis pushes project to AWS Elastic Beanstalk
7. Elastic Beanstalk pulls images from Docker Hub, Deploys
