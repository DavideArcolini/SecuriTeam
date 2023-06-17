'use strict'

const express = require('express');
const AccessController = require('../controllers/accessController.js');

/* router definition */
const router = express.Router();
const accessController = new AccessController();


/* api definition */
router.post(
    '/preauthenticate/:port', 
    async (request, response) => {
        accessController
        .preauthenticateEmployee(request.params.port, request.body.username, request.body.password)
        .then(result => {

            /* temporary storing the authentication challenge */
            request.session.expectedChallenge = result.objectBody.data.challenge;
            console.log(`🌀 Crafting special session to keep track of the FIDO challenge`);
            return response.status(result.statusCode).json(result.objectBody);
        })
        .catch(error => {
            console.log(error)
            return response.status(error.statusCode).json(error.objectBody);
        })        
    }
);

router.post(
    '/authenticate/:port',
    async (request, response) => {
        accessController
        .authenticateEmployee(request.params.port, request.body, request.session.expectedChallenge)
        .then(result => {
            console.log(`✅ Device authenticated!`);
            return response.status(result.statusCode).json(result.objectBody);
        })
        .catch(error => {
            console.log(error)
            return response.status(error.statusCode).json(error.objectBody);
        })   
    }
);


module.exports = router
