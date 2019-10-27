# fibonacciCalc - Multi-Container - Docker

## Overview

This is an over the top fibonacci calculator. It will Utilize React, Express, Redis and Postgres.
The goal of this application is to better understand multi container deployment.

## Deploy

to deploy as dev:
    Client standalone:
        docker build -f Dockerfile.dev .
        docker run -p 3000:3000 "id"

    Server standalone:
        docker build -f Dockerfile.dev .
        docker run "id"

        will result in err conn refused. this is because no pstgres server is running.

    Worker standalone:
        docker build -f Dockerfile.dev .
        docker run "id"

docker compose:
    run from root:
        docker-compose up

    note: if running on Windows 10 Home on docker cli, docker-compose up may cause errors. Currently the version of Virtual box that comes with docker cli does not support volumes.
    As of yet i have not found a viable so;ution to this error.
