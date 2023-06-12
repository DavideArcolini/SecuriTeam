'use strict'

const constants = require("../utils/constants.js");
const axios = require('axios');

class AdminController {

    ping = async (svcinfo) => {

        /* sending the request to the FIDO server */
        axios.post(
            `http://${constants.SKFS_HOST}:${constants.SKFS_PORT}/ping`,
            svcinfo
        )
        .then(response => {})
        .catch(error => {})
    }
}

module.exports = AdminController