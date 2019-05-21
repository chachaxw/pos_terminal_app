/**
 * @format
 * @flow
 */
import { AUTHORIZE, GENERATE_KEY } from '../actions';

type KeyPair = {
  secretKey: string,
  publicKey: string,
}

type AppState = {
  keyPair: KeyPair,
  accessToken: string | null,
  isAuthenticated: bool,
}

const initialState = {
  keyPair: {
    secretKey: null,
    publicKey: null,
  },
  accessToken: null,
  isAuthenticated: false,
}

export default function(state: AppState = initialState, action) {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        accessToken: action.accessToken,
        isAuthenticated: action.isAuthenticated,
      };
    
    case GENERATE_KEY:
      return {
        ...state,
        keyPair: action.keyPair,
      };
    default:
      return state;
  }
}