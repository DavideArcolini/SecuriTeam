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
            console.log(result.objectBody.challenge)
            request.session.expectedChallenge = result.objectBody.challenge;
            console.log(request.session)
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
        console.log("[!] request.session should contain the challenge (currently: ")
        console.log(request.session)

        registerController
        .registerAuthenticator(request.body)
        .then(result => {
            return response.status(result.statusCode).json(result.objectBody);
        })
        .catch(error => {
            console.log(error)
            return response.status(error.statusCode).json(error.objectBody);
        })        
    }
);

module.exports = router
