import type { AuthenticatorDevice } from '@simplewebauthn/typescript-types';


/**
 * Users: 
 * associate registration and authentications challenges, and
 * authenticators to a specific user
 */
interface LoggedInUser {
    id: string;
    username: string;
    devices: AuthenticatorDevice[];
}


declare module 'express-session' {
    interface SessionData {
      currentChallenge?: string;
    }
}