/**
 * @format
 * @flow
 */
import { AUTHORIZE } from '../actions';

type AppState = {
  accessToken: string | null,
  isAuthenticated: bool,
}

const initialState = {
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
    default:
      return state;
  }
}