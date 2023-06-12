'use strict'

const { default: axios } = require('axios');
const constants = require('../utils/constants.js');
const responseFactory = require('../utils/response-factory.js');

class RegisterController {

    /**
     * 
     * PREREGISTER A NEW AUTHENTICATOR DEVICE
     * 
     */
    preregisterAuthenticator = async () => {

        return fetch(
            `http://${constants.FIDO_SERVER_HOST}:8181/preregister`,
            {
                method: 'GET'
            }
        ).then(async function (response) {

            /* managing the response */
            const preregisterResponse = await response.json()
            return responseFactory.fabricateResponse(200, preregisterResponse);
            
        }).catch(function (error) {
            console.log(error);
            throw responseFactory.fabricateError(400, error);
        })
    }



    /**
     * 
     * REGISTER A NEW AUTHENTICATOR DEVICE
     * 
     */
    registerAuthenticator = async (data) => {

        return fetch(
            `http://${constants.FIDO_SERVER_HOST}:8181/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(async function (response) {

            /* managing the response */
            const registerResponse = await response.json()
            console.log("--- BROKER: registerAuthenticator ---")
            console.log(registerResponse);
            console.log("--- BROKER: registerAuthenticator ---")
            return responseFactory.fabricateResponse(200, registerResponse);
            
        }).catch(function (error) {
            console.log(error);
            throw responseFactory.fabricateError(400, error);
        })
    }
    
}

module.exports = RegisterController