'use strict';

module.exports = Object.freeze({

    /* FIDO SERVER */
    FIDO_SERVER_HOST: JSON.parse(process.env.DOCKERCOMPOSE) ? "fidoserver" : "localhost"
});