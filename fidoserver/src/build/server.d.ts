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
export declare const rpID: string;
export declare let expectedOrigin: string;
