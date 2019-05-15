/**
 * @format
 * @flow
 */
import { AUTHORIZE } from '../actions';

type AppState = {
  isAuthenticated: bool,
}

const initialState = {
  isAuthenticated: false,
}

export default function(state: AppState = initialState, action) {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}