'use strict'

const express = require('express');
const RegisterController = require('../controllers/registerController.js');


/* router definition */
const router = express.Router();
const registerController = new RegisterController();


/* api definition */
router.get(
    '/preregister', 
    async (request, response) => {
        registerController
        .preregisterAuthenticator()
        .then(result => {

            /* temporary storing the registration challenge */
            request.session.expectedChallenge = result.objectBody.challenge;
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
    '/register', 
    async (request, response) => {
        registerController
        .registerAuthenticator(request.body, request.session.expectedChallenge)
        .then(result => {
            console.log(`✅ New device registered!`);
            return response.status(result.statusCode).json(result.objectBody);
        })
        .catch(error => {
            console.log(error)
            return response.status(error.statusCode).json(error.objectBody);
        })        
    }
);

module.exports = router
