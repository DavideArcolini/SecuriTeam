'use strict'

class ResponseManager {

    /* given a HTTP response, checks whether the response has been successful */
    isAuthenticated(response) {
        if (response && response.status ) {
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        return false;
    }


    getCookie(response) {
        return response.headers.get('set-cookie');
    }
}

module.exports = ResponseManager;