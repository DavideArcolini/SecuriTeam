#!/bin/bash
docker rm -f broker-server
docker build -t broker-server . && \
	docker run --name=broker-server --rm -p 3001:3001 -it broker-server