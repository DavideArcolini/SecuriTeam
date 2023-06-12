#!/bin/bash
docker rm -f broker-client
docker build -t broker-client . && \
	docker run --name=broker-client --rm -p 3000:3000 -it broker-client