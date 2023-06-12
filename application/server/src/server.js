'use strict'

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { isLoggedIn } = require('./login_validator')
const cors          = require("cors");

const corsOptions = {
    origin: 'http://localhost:8000',
	credentials: true
};


/* user object with dummy data for testing purposes */
const user = {
	id: 1,
  	username: 'johndoe@studenti.polito.it',
  	password: 'password',
};


/* Passport strategy definition */
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async function verify (username, password, done) {
        if (username === user.username && password === user.password) {
			return done(null, user);
		  } else {
			return done(null, false, { message: 'Incorrect username or password' });
		  }
    }
));
passport.serializeUser(
    (user, callback) => {
        callback(null, user);
    }
);
passport.deserializeUser(
    async (user, callback) => {
        return callback(null, user);
    }
);



// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: "shhhhh... it's a secret!",         // sign the sessionId
  resave: false,
  saveUninitialized: false
}));
app.use(passport.authenticate('session'));

/**
 * Login endpoint used to verify the user credentials.
 * Authentication: 	session
 * Strategy: 		local
 * ---------------------------------------------------
 * @param req.body.username the username of the user
 * @param req.body.password the password of the user
 * 
 * @return 201 on success, 401 on failure
 */
app.post(
	'/api/login',
	passport.authenticate('local'),
	async (req, res) => {
		console.log(`[+] User logged successfully!`)
		return res.status(201).json({ message: 'Login successful' });
  	}
);

/**
 * Test endpoint used to check if the user is 
 * authenticated or not.
 * Authentication: 	session
 * ------------------------------------------
 * 
 * @return 200 on success, 401 on failure
 */
app.get(
	'/api/test', 
	isLoggedIn, 
	async (req, res) => {
		console.log("[+] Received request to test the authorization.")
  		return res.json({ message: 'YES' });
	}
);


/**
 * Test endpoint used to remove the current 
 * authenticated session.
 * Authentication: 	session
 * ------------------------------------------
 * 
 * @return 200 on success, 401 on failure
 */
app.delete(
    '/api/logout',
    async (request, response) => {

        request.logOut(() => {
            response.end();
        });
    }
);

// Start server
const port = 8001;
app.listen(port, () => {
	console.log(`🚀 SecuriTeam Internal Legacy Application (server) is now running at http://localhost:${port}`);
});
