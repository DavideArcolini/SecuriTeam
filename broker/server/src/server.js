/**
 *  + --------------------------------------- +
 *  |       SecuriTeam Broker (server)        |
 *  + --------------------------------------- +
 * 
 * This module contains the express application that exposes and manages the APIs
 * for the SecuriTeam Broker application.
*/

'use strict'

/* --- importing modules --- */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const constants = require('./utils/constants')

/* --- configuring express server --- */
const app = express();
app.use(express.json());

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
};
app.use(cors(corsOptions));

/* session */
app.use(
	session({
		secret: 'SecuriTeam',
		saveUninitialized: true,
		resave: false,
		cookie: {
			httpOnly: false,
			maxAge: 24 * 60 * 60	// 24 hours
		}
	})
);


 
/* --- configuring express routes --- */
const accessRouter = require('./routers/accessRouter.js');
const registerRouter = require('./routers/registerRouter.js');
const proxyRouter = require('./routers/proxyRouter.js');
app.use('/auth', accessRouter);
app.use('/register', registerRouter);
app.use('/proxy', proxyRouter);

/* --- starting the server --- */
const port = 3001;
app.listen(port, () => {
	console.log(`🚀 SecuriTeam Broker (server) is now running at http://localhost:${port}`);
});