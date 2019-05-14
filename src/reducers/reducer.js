/**
 * @format
 * @flow
 */

type AppState = {
  isAuthenticated: bool,
}

const initialState = {
  isAuthenticated: false,
}

export default function(state: AppState = initialState, action) {
  switch (action) {
    default:
      return state;
  }
}