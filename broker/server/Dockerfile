FROM node:alpine

WORKDIR /app

COPY src/ .

RUN npm install

EXPOSE 3001

ENV DOCKERCOMPOSE=true

CMD ["npm", "run", "start"]
