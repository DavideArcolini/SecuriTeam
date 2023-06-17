/* --------- BACK-END SERVER ENDPOINTS INFORMATION --------- */
const PORT = 3001;
const HOST = (process.env.APPLICATION_HOST) ? process.env.APPLICATION_HOST : "localhost"
const PREFIX_URL = `http://${HOST}:${PORT}`;

const { startAuthentication, startRegistration } = require('@simplewebauthn/browser');

class ApiManager {

    registerAuthenticator = async () => {

        /* retrieving registration options */
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

        /* submitting registration response */
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

    loginToApplication = async (credentials) => {

        /* retrieving authentication options */   
        const resp = await fetch(`${PREFIX_URL}/auth/preauthenticate/8001`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        let asseResp;
        let opts;
        try {
            opts = await resp.json();
            asseResp = await startAuthentication(opts.data);
        } catch (error) {
            console.log(error);
            return false;
        }

        /* submitting authentication response */
        const verificationResp = await fetch(`${PREFIX_URL}/auth/authenticate/8001`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(asseResp)
        });

        const verificationJSON = await verificationResp.json();
        if (verificationJSON && verificationJSON.verified) {
            return opts.cookie;
        } else {
            return false;
        }
    }
}

export { ApiManager };