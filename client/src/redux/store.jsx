import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import studentReducer from './studentSlice';
import complaintsReducer from './complaintSlice'; // Import your complaints reducer

const studentPersistConfig = {
  key: 'students',
  storage,
};

const persistedStudentReducer = persistReducer(studentPersistConfig, studentReducer);

const complaintsPersistConfig = {
  key: 'complaints',
  storage,
};

const persistedComplaintsReducer = persistReducer(complaintsPersistConfig, complaintsReducer);

const store = configureStore({
  reducer: {
    students: persistedStudentReducer,
    complaints: persistedComplaintsReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
