/**
 * @format
 * @flow
 */

export const AUTHORIZE = 'AUTHORIZE';
export const GENERATE_KEY = 'GENERATE_KEY';

export function authorizeAction(accessToken: string, isAuthenticated: bool) {
  return {
    type: AUTHORIZE,
    accessToken,
    isAuthenticated,
  }
}

export function generateKeyPairAction(keyPair: object) {
  return {
    type: GENERATE_KEY,
    keyPair,
  }
}