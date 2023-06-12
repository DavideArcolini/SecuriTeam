#!/bin/bash
docker rm -f application-server
docker build -t application-server . && \
	docker run --name=application-server --rm -p 8001:8001 -it application-server