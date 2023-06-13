/* --------- BACK-END SERVER ENDPOINTS INFORMATION --------- */
const PORT = 8001;
const HOST = (process.env.APPLICATION_HOST) ? process.env.APPLICATION_HOST : "localhost"
const PREFIX_URL = `http://${HOST}:${PORT}`;

class apiManager {

    login = async (username, password) => {

        const url = PREFIX_URL + '/api/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            console.log(response)

            if (response.ok) {

                /* processing the response */
                const employee = await response.json();
                return employee;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            throw error;
        }
    }

    logout = async () => {
        const url = PREFIX_URL + '/api/logout';
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {

                /* processing the response */
                return null;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            throw error;
        }
    }


    test = async () => {
        const url = PREFIX_URL + '/api/test';
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {

                /* processing the response */
                return response;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            throw error;
        }
    }
}

export { apiManager };