// import { configureStore } from '@reduxjs/toolkit';
// import studentReducer from './studentSlice';

// const store = configureStore({
//   reducer: {
//     students: studentReducer,
//   },
// });

// export default store;



// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import studentReducer from './studentSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, studentReducer);

const store = configureStore({
  reducer: {
    students: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
