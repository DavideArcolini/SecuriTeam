"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedOrigin = exports.rpID = void 0;
/* --- imports --- */
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
/* configuring environment */
dotenv_1.default.config();
/* webauthn libraries */
const server_1 = require("@simplewebauthn/server");
const helpers_1 = require("@simplewebauthn/server/helpers");
/* --- express generation and configuration --- */
const app = (0, express_1.default)();
const { ENABLE_CONFORMANCE, ENABLE_HTTPS, RP_ID = 'localhost', } = process.env;
app.use(express_1.default.json());
exports.rpID = RP_ID;
exports.expectedOrigin = ''; /* configured at server init */
/* --- server-stored data about logged in user --- */
const loggedInUserId = 'exampleuserId';
const inMemoryUserDeviceDB = {
    [loggedInUserId]: {
        id: loggedInUserId,
        username: `exampleuser@${exports.rpID}`,
        devices: [],
    },
};
/* metadata statements */
if (ENABLE_CONFORMANCE === 'true') {
    console.log("[!] enabled FIDO conformance.");
    Promise.resolve().then(() => __importStar(require('./fido-conformance'))).then(({ fidoRouteSuffix, fidoConformanceRouter }) => {
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
    const { username, devices } = inMemoryUserDeviceDB[loggedInUserId];
    const opts = {
        rpName: 'SecuriTeam FIDO Server',
        rpID: exports.rpID,
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
    const options = (0, server_1.generateRegistrationOptions)(opts);
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
    const body = request.body.data;
    const user = inMemoryUserDeviceDB[loggedInUserId];
    const expectedChallenge = request.body.challenge;
    /* verify the challenge */
    let verification;
    try {
        const opts = {
            response: body,
            expectedChallenge: `${expectedChallenge}`,
            expectedOrigin: exports.expectedOrigin,
            expectedRPID: exports.rpID,
            requireUserVerification: true,
        };
        verification = await (0, server_1.verifyRegistrationResponse)(opts);
    }
    catch (error) {
        const _error = error;
        console.error(_error);
        return response.status(400).send({ error: _error.message });
    }
    /* result analysis */
    const { verified, registrationInfo } = verification;
    if (verified && registrationInfo) {
        const { credentialPublicKey, credentialID, counter } = registrationInfo;
        /* adding new device for this user */
        const existingDevice = user.devices.find(device => helpers_1.isoUint8Array.areEqual(device.credentialID, credentialID));
        if (!existingDevice) {
            const newDevice = {
                credentialPublicKey,
                credentialID,
                counter,
                transports: body.response.transports,
            };
            user.devices.push(newDevice);
        }
    }
    response.send({ verified });
});
app.get('/preauthenticate', (request, response) => {
});
app.post('/authenticate', (request, response) => {
});
/* --- server initialization --- */
// const host = '127.0.0.1';
const port = 8181;
exports.expectedOrigin = `http://localhost:3000`;
http_1.default.createServer(app).listen(port, () => {
    console.log(`🚀 StrongKey (mock) FIDO Server is now running at ${exports.expectedOrigin}`);
});
//# sourceMappingURL=server.js.map