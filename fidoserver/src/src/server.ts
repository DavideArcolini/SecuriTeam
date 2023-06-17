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
import base64url from 'base64url';


/* --- express generation and configuration --- */

const app = express();
const {
	EXPECTED_HOST,
	EXPECTED_PORT,
  	ENABLE_CONFORMANCE,
 	ENABLE_HTTPS,
  	RP_ID = 'localhost',
} = process.env;
app.use(express.json());

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
	
	console.log(`🌀 Sending registration options for ${username}`);
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
	const body: RegistrationResponseJSON = request.body.data;
	const user = inMemoryUserDeviceDB[loggedInUserId];
	const expectedChallenge = request.body.challenge;
  
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
	  	console.log(`❌ An error occurred. See below:`);
		console.log(_error);
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
	
	console.log(`📱 Register new device for ${user.username} (${user.id})`);
	response.send({ verified });

});

app.get('/preauthenticate', (request, response) => {

	const user = inMemoryUserDeviceDB[loggedInUserId];

	const opts: GenerateAuthenticationOptionsOpts = {
		timeout: 60000,
		allowCredentials: user.devices.map(dev => ({
		  	id: dev.credentialID,
		  	type: 'public-key',
		  	transports: dev.transports,
		})),
		userVerification: 'required',
		rpID,
	};
	
	const options = generateAuthenticationOptions(opts);

	console.log(`🌀 Sending authentication options for ${user.username}`);
	response.send(options);

});

app.post('/authenticate', async (request, response) => {

	/* retrieving information */
	const body: AuthenticationResponseJSON = request.body.data;
	const user = inMemoryUserDeviceDB[loggedInUserId];
	const expectedChallenge = request.body.challenge;

	/* "Query the DB" here for an authenticator matching `credentialID` */
	let dbAuthenticator;
  	const bodyCredIDBuffer = base64url.toBuffer(body.rawId);
  	for (const dev of user.devices) {
    	if (isoUint8Array.areEqual(dev.credentialID, bodyCredIDBuffer)) {
      		dbAuthenticator = dev;
      		break;
    	}
  	}
	if (!dbAuthenticator) {
		return response.status(400).send({ error: 'Authenticator is not registered with this site' });
	}

	/* verify the challenge */
	let verification: VerifiedAuthenticationResponse;
  	try {
    	const opts: VerifyAuthenticationResponseOpts = {
      		response: body,
      		expectedChallenge: `${expectedChallenge}`,
      		expectedOrigin,
      		expectedRPID: rpID,
      		authenticator: dbAuthenticator,
      		requireUserVerification: true,
    	};
    	verification = await verifyAuthenticationResponse(opts);
  	} catch (error) {
    	const _error = error as Error;
		console.log(`❌ An error occurred. See below:`);
    	console.error(_error);
    	return response.status(400).send({ error: _error.message });
  	}

	/* result post-operation */
	const { verified, authenticationInfo } = verification;
  	if (verified) {
    	/* update the authenticator's counter in the DB to the newest count in the authentication */
    	dbAuthenticator.counter = authenticationInfo.newCounter;
  	}

	console.log(`📱 Authenticated device for ${user.username} (${user.id})`);
	response.send({ verified });
});


/* --- server initialization --- */
const port = 8181;
expectedOrigin = `http://localhost:3000`;


http.createServer(app).listen(port, () => {
    console.log(`🚀 StrongKey (mock) FIDO Server is now running at ${
		process.env.dockercompose ? "fidoserver:8181" : "localhost:8181"
	}`);
});