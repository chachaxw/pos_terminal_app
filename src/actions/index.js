/**
 * @format
 * @flow
 */

export const AUTHORIZE = 'AUTHORIZE';

export function authorizeAction(isAuthenticated: bool) {
  return {
    type: AUTHORIZE,
    iisAuthenticated,
  }
}