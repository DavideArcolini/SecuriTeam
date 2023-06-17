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

        /* post credentials to application */
        return fetch(`http://${constants.APPLICATION_HOST}:${port}/api/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => {

            /* checking authentication response from application */
            if (responseManager.isAuthenticated(response)) {
                console.log(`👍 ${username} would have been correctly authenticated to application. Let's add MFA!`)

                /* store cookie/token */
                const cookie = responseManager.getCookie(response) /* TODO: store it in Redis (or other DB) */

                /* fetching preauthentication data */
                return fetch(`http://${constants.FIDOSERVER_HOST}:${constants.FIDOSERVER_PORT}/preauthenticate`, {
                    method: "GET",
                }).then(async response => {
                    const challenge = await response.json();
                    const result = {
                        cookie: cookie,
                        data: challenge
                    }
                    return responseFactory.fabricateResponse(response.status, result)
                }).catch(error => {
                    console.log(error);
                    throw error;
                });

            } else {
                console.log(`👎 ${username} would have NOT been correctly authenticated to application.`)
                return responseFactory.fabricateResponse(response.status, response.body)
            }
            
        }).catch(error => {
            console.log(error);
            throw error;
        });

    }

    authenticateEmployee = async (port, data, challenge) => {
        return fetch(
            `http://${constants.FIDOSERVER_HOST}:8181/authenticate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data,
                    challenge: challenge
                })
            }
        ).then(async function (response) {

            /* managing the response */
            const registerResponse = await response.json()
            return responseFactory.fabricateResponse(200, registerResponse);
            
        }).catch(function (error) {
            console.log(error);
            throw responseFactory.fabricateError(400, error);
        })
    }
}

module.exports = AccessController