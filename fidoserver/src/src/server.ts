/**
 *  + ------------------------ +
 *  |       FIDO Server        |
 *  + ------------------------ +
 * 
 * This module contains the express application that exposes and manages the APIs
 * that mock the StrongKey FIDO Server used for the original simulation.
 * 
 * API:
 * 
 * 	- `GET /preregister`: retrieve the user's authenticator's options for registration;
 * 	- `POST /register`: submit the solved registration challenge;
 * 	- `GET /preauthenticate`: retrieve the user's authenticator's options for authentication;
 * 	- `POST /authenticate`: submit the solved authentication challenge;
*/


/* --- imports --- */
import http from 'http';
import express from 'express';
import session from 'express-session';
import memoryStore from 'memorystore';
import dotenv from 'dotenv';

/* configuring environment */
dotenv.config()


/* webauthn libraries */
import {
	generateRegistrationOptions,  /* registration */
  	verifyRegistrationResponse,
  	generateAuthenticationOptions,  /* authentication */
  	verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { isoUint8Array } from '@simplewebauthn/server/helpers';
import type {
  	GenerateRegistrationOptionsOpts,
  	GenerateAuthenticationOptionsOpts,
  	VerifyRegistrationResponseOpts,
  	VerifyAuthenticationResponseOpts,
  	VerifiedRegistrationResponse,
  	VerifiedAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  	RegistrationResponseJSON,
  	AuthenticationResponseJSON,
  	AuthenticatorDevice,
} from '@simplewebauthn/typescript-types';

/* user-authenticators association */
import { LoggedInUser } from './database';


/* --- express generation and configuration --- */
const app = express();
/* configuring memory store */
const MemoryStore = memoryStore(session);
const {
  	ENABLE_CONFORMANCE,
 	ENABLE_HTTPS,
  	RP_ID = 'localhost',
} = process.env;

app.use(express.json());
app.use(
	session({
	  secret: 'secret123',
	  saveUninitialized: true,
	  resave: false,
	  cookie: {
		maxAge: 86400000,
		httpOnly: true, // Ensure to not expose session cookies to clientside scripts
	  },
	  store: new MemoryStore({
		checkPeriod: 86_400_000, // prune expired entries every 24h
	  }),
	}),
  );

export const rpID = RP_ID;
export let expectedOrigin = '';	/* configured at server init */

/* --- server-stored data about logged in user --- */
const loggedInUserId = 'exampleuserId';
const inMemoryUserDeviceDB: { [loggedInUserId: string]: LoggedInUser } = {
  [loggedInUserId]: {
    id: loggedInUserId,
    username: `exampleuser@${rpID}`,
    devices: [],
  },
};



/* configuring express application */



/* metadata statements */
if (ENABLE_CONFORMANCE === 'true') {
	console.log("[!] enabled FIDO conformance.")
	import('./fido-conformance').then(({ fidoRouteSuffix, fidoConformanceRouter }) => {
	  	app.use(fidoRouteSuffix, fidoConformanceRouter);
	});
}



/* --- APIs --- */


/**
 * Retrieve the available authenticator's options for the registration of a new
 * FIDO passkey, considering the already registered methods of the current
 * logged in user.
 * ----------------------------------------------------------------------------
 * API endpoint: 
 * 							`GET /preregister`
 */
app.get('/preregister', async (request, response) => {

	/* retrieving information */
	const {username, devices} = inMemoryUserDeviceDB[loggedInUserId];
	const opts: GenerateRegistrationOptionsOpts = {
	  	rpName: 'SecuriTeam FIDO Server',
	  	rpID,
	  	userID: loggedInUserId,
	  	userName: username,
	  	timeout: 60000,
	  	attestationType: 'none',
		excludeCredentials: devices.map(dev => ({
			id: dev.credentialID,
			type: 'public-key',
			transports: dev.transports,
	  	})),
		authenticatorSelection: {
			residentKey: 'discouraged',
	  	},
	  	supportedAlgorithmIDs: [-7, -257],
	};
	
	/* generating options */
	const options = generateRegistrationOptions(opts);
  
	/* temporary storing the challenge */
	request.session.currentChallenge = options.challenge;
  
	response.send(options);
});



/**
 * Validate the registration response of the user, 
 * ----------------------------------------------------------------------------
 * API endpoint: 
 * 							`POST /register`
 */
app.post('/register', async (request, response) => {

	/* retrieving information */
	const body: RegistrationResponseJSON = request.body;
	const user = inMemoryUserDeviceDB[loggedInUserId];
	const expectedChallenge = request.session.currentChallenge;

	console.log("--- FIDO SERVER: /register ---")
	console.log(`[!] expectedChallenge should be different than undefined (currently: ${expectedChallenge})`)
	console.log("--- FIDO SERVER: /register ---")
  
	/* verify the challenge */
	let verification: VerifiedRegistrationResponse;
	try {
		const opts: VerifyRegistrationResponseOpts = {
			response: body,
			expectedChallenge: `${expectedChallenge}`,
			expectedOrigin,
			expectedRPID: rpID,
			requireUserVerification: true,
	  	};
	  	verification = await verifyRegistrationResponse(opts);
	} catch (error) {
	  	const _error = error as Error;
	  	console.error(_error);
	  	return response.status(400).send({ error: _error.message });
	}
	
	/* result analysis */
	const { verified, registrationInfo } = verification;
	if (verified && registrationInfo) {
	  	const { credentialPublicKey, credentialID, counter } = registrationInfo;

		/* adding new device for this user */
	  	const existingDevice = user.devices.find(device => isoUint8Array.areEqual(device.credentialID, credentialID));
	  	if (!existingDevice) {
			const newDevice: AuthenticatorDevice = {
		  		credentialPublicKey,
		  		credentialID,
		  		counter,
		  		transports: body.response.transports,
			};
			user.devices.push(newDevice);
	 	}
	}
	
	/* resetting challenge */
	request.session.currentChallenge = undefined;
  
	response.send({ verified });

});

app.get('/preauthenticate', (request, response) => {

});

app.post('/authenticate', (request, response) => {

});


/* --- server initialization --- */
// const host = '127.0.0.1';
const port = 8181;
expectedOrigin = `http://localhost:${port}`;


http.createServer(app).listen(port, () => {
    console.log(`🚀 StrongKey (mock) FIDO Server is now running at ${expectedOrigin}`);
});