#!/bin/sh
set -e

ENV=$2
BASE='hemilabs/'

if [ "$ENV" = 'local' ]; then
    BASE=''
fi

docker build --platform linux/amd64 -t ${BASE}cryptochords-api -f Dockerfile.api .
