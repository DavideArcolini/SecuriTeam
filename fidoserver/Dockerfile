FROM node:latest as base

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY src/ .

# Production steps
FROM base as production

ENV NODE_PATH=./build

RUN npm run build

# Final image
FROM base

COPY --from=production /app/build /app/build

CMD ["npm", "start"]