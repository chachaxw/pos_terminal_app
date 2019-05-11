import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initStore = (initialState) => {
  return createStore(
    persistedReducer,
    initialState,
    applyMiddleware()
  );
}

const store = initStore();

const persistor = persistStore(store);

export { store, persistor };