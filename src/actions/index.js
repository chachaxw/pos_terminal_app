/**
 * @format
 * @flow
 */

export const AUTHORIZE = 'AUTHORIZE';

export function authorizeAction(accessToken: string, isAuthenticated: bool) {
  return {
    type: AUTHORIZE,
    accessToken,
    isAuthenticated,
  }
}