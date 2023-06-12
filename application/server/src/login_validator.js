'use strict';


function isLoggedIn(request, response, next) {

    if (request.isAuthenticated()) {
        next();
    } else {
        return response.status(401).json("Unauthorized");
    }
}

module.exports = { isLoggedIn }