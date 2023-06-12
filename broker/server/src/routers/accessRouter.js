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
        .authenticateEmployee(request.params.port, request.body)
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
