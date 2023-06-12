'use strict'

const express = require('express');
const axios = require('axios');
const responseFactory = require('../utils/response-factory.js');


/* router definition */
const router = express.Router();

router.get('/*/:port', async (request, response) => {
    const { port } = request.params;
    const content = request.params[0];
    const { method, body, headers } = request;
    const targetUrl = `http://localhost:${port}/${content}`;

    console.log(targetUrl)

    const res = await axios
        .get(targetUrl, {headers: headers})
        .then(response => {
            return responseFactory.fabricateResponse(response.status, response.data);
        })
        .catch(error => {
            console.log(error)
            return responseFactory.fabricateResponse(500, {error: "Error"})
        })

    return response.status(res.statusCode).json(res.objectBody)
    
});




module.exports = router
