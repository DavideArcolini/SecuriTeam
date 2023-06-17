'use strict';

module.exports = Object.freeze({

    /* FIDO SERVER */
    FIDOSERVER_HOST: (process.env.FIDOSERVER_HOST) ? process.env.FIDOSERVER_HOST : "localhost",
    FIDOSERVER_PORT: (process.env.FIDOSERVER_PORT) ? process.env.FIDOSERVER_PORT : "8181",


    /* APPLICATION SERVER */
    APPLICATION_HOST: (process.env.APPLICATION_HOST) ? process.env.APPLICATION_HOST : "localhost",

    /* REDIS SERVER */
    REDIS_HOST: "redis-stack",
    REDIS_PORT: "6379"
});