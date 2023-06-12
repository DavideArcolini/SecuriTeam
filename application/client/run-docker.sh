#!/bin/bash
docker rm -f application-client
docker build -t application-client . && \
	docker run --name=application-client --rm -p 8000:8000 -it application-client