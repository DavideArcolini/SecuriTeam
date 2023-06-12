#!/bin/bash
docker rm -f securiteam_fidoserver
docker build -t securiteam_fidoserver . && \
	docker run --name=securiteam_fidoserver --rm -p 127.0.0.1:8181:8181 -it securiteam_fidoserver
