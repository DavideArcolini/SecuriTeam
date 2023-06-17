FROM node:alpine

WORKDIR /app

COPY src/ .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]
