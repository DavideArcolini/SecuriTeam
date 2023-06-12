'use strict'

const constants = require('../utils/constants.js');
const ResponseManager = require('../utils/responseManager.js');
const responseFactory = require('../utils/response-factory.js');


const responseManager = new ResponseManager();

class AccessController {

    /**
     * Implement the broker logic used to proxy the login request to the application
     * @param {Number} port the port in localhost to which the application is listening to. In the real broker, this will refer to the address of the internal legacy application.
     * @param {String} username 
     * @param {String} password 
     */
    preauthenticateEmployee = async (port, username, password) => {

        return fetch(
            `http://${constants.WA_1}:${port}/api/login`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        username: username,
                        password: password
                    }
                )
            }
        ).then(async (response) => {

            /* checking if the user would have been authenticated */
            if (responseManager.isAuthenticated(response)) {

                /* store the cookie/token (in DB?) */
                responseManager.getCookie(response)

                /* --- START FIDO PRE-AUTHENTICATION --- */
                console.log("/* --- START FIDO PRE-AUTHENTICATION --- */")
                return fetch(
                    // `http://${constants.SKFS_HOST}:${constants.SKFS_PORT}/skfs/rest/preauthenticate`, 
                    // 'http://localhost:8181/skfs/rest/preauthenticate',
                    'https://0a84-151-60-171-105.eu.ngrok.io/skfs/rest/preauthenticate',
                    {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    "svcinfo": {
                                        "did": 1,
                                        "protocol": "FIDO2_0",
                                        "authtype": "PASSWORD",
                                        "svcusername": "fido2service",
                                        "svcpassword": "1234_"
                                    },
                                    "payload": {
                                        "username": username,
                                        "options": {}
                                    }
                                }
                            )
                        }
                    ).then(function(response) {
                        return response.json();
                    }).then(function(data) {

                        /* crafting the response for the user */
                        console.log(data)
                        return responseFactory.fabricateResponse(200, data)

                    }).catch(function (error) {
                        console.log(error);
                        throw responseFactory.fabricateError(400, { message: "error" });
                    }
                )
            } else {

                /* the user would have not beed authenticated to the webapp */
                console.log(" USER IS NOT AUTHN ")
                throw responseFactory.fabricateError(401, "Unauthorized");
            }

        }).catch((error) => {
            console.log(error)
            throw responseFactory.fabricateError(401, "Unauthorized");
        })
    }





    authenticateEmployee = async (port, body, expectedChallenge) => {

        return fetch(
            // `http://${constants.SKFS_HOST}:${constants.SKFS_PORT}/skfs/rest/preauthenticate`, 
            // 'http://localhost:8181/skfs/rest/authenticate',
            'https://0a84-151-60-171-105.eu.ngrok.io/skfs/rest/authenticate',
            {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                }
        ).then(function(response) {
            return response.json();
        }).then(function(data) {

            return responseFactory.fabricateResponse(200, data)

        }).catch(function (error) {
            console.log(error);
            throw responseFactory.fabricateError(400, { message: "error" });
        })
    }
}

module.exports = AccessController