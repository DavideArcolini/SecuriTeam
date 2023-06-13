/* --------- BACK-END SERVER ENDPOINTS INFORMATION --------- */
const PORT = 3001;
const HOST = (process.env.APPLICATION_HOST) ? process.env.APPLICATION_HOST : "localhost"
const PREFIX_URL = `http://${HOST}:${PORT}`;

const { startRegistration } = require('@simplewebauthn/browser');

class ApiManager {

    registerAuthenticator = async () => {
        const resp = await fetch(
            `${PREFIX_URL}/register/preregister`, {
                method: 'GET',
                credentials: 'include'
            }
        );
        let attResp;
        try {
            const opts = await resp.json();
            attResp = await startRegistration(opts);
        } catch (error) {
            return false
        }

        const verificationResp = await fetch(`${PREFIX_URL}/register/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(attResp),
        });

        const verificationJSON = await verificationResp.json();

        if (verificationJSON && verificationJSON.verified) {
            return true
        } else {
            return false
        }
    }

    loginToApplication = async () => {

    }


}

export { ApiManager };