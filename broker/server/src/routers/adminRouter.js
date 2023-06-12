'use strict'

const express = require('express');
const AdminController = require('../controllers/adminController.js');


/* router definition */
const router = express.Router();
const adminController = new AdminController();

/* api definition */


/**
 * TODO: validate body object (svc info)
 */
router.post(
    '/ping',
    async (request, response) => {
        adminController
        .ping(request.body)
        .then(result => {return response.status(result.statusCode).json(result.objectBody)})
        .catch(error => {return response.status(error.statusCode).json(error.objectBody)});
    }
);

module.exports = router