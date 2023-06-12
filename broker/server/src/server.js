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
const redis = require('redis')
const redisStore = require('connect-redis').default;
const cors = require("cors");
const constants = require('./utils/constants')

/* --- configuring express server --- */
const app = express();
app.use(express.json());

/* cors */
const corsOptions = {
	origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

/* redis */
const redisClient = redis.createClient({
	host: constants.REDIS_HOST,
	port: constants.REDIS_PORT
});


/* session */
app.use(
	session({
		secret: 'secret123',
		saveUninitialized: true,
		resave: false,
		cookie: {
			maxAge: 86400000,
			httpOnly: true, // Ensure to not expose session cookies to clientside scripts
		},
		store: new redisStore({ 
			host: constants.REDIS_HOST, 
			port: constants.REDIS_PORT, 
			client: redisClient, 
			ttl: 86400 
		})
	}),
);

 
/* --- configuring express routes --- */
const adminRouter = require('./routers/adminRouter.js');
const accessRouter = require('./routers/accessRouter.js');
const registerRouter = require('./routers/registerRouter.js');
const proxyRouter = require('./routers/proxyRouter.js');
app.use('/admin', adminRouter);
app.use('/auth', accessRouter);
app.use('/register', registerRouter);
app.use('/proxy', proxyRouter);

/* --- starting the server --- */
const port = 3001;
app.listen(port, () => {
	console.log(`🚀 SecuriTeam Broker (server) is now running at http://localhost:${port}`);
});