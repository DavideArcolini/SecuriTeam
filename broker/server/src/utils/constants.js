'use strict';

module.exports = Object.freeze({

    /* FIDO SERVER */
    FIDO_SERVER_HOST: (process.env.DOCKERCOMPOSE == "true") ? "fidoserver" : "localhost",

    /* REDIS SERVER */
    REDIS_HOST: "redis-stack",
    REDIS_PORT: "6379"
});