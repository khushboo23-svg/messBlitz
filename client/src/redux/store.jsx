
// Import necessary modules
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import your reducers
import studentReducer from './studentSlice';
import complaintsReducer from './complaintSlice';
import chiefWardenReducer from './chiefWardenSlice';
import wardenReducer from './wardenSlice'
import hostelReducer from './hostelSlice'

// Configuration for persisting student reducer
const studentPersistConfig = {
  key: 'students',
  storage,
};

// Create persisted student reducer
const persistedStudentReducer = persistReducer(studentPersistConfig, studentReducer);

// Configuration for persisting complaints reducer
const complaintsPersistConfig = {
  key: 'complaints',
  storage,
};

// Create persisted complaints reducer
const persistedComplaintsReducer = persistReducer(complaintsPersistConfig, complaintsReducer);

// Configuration for persisting chiefWarden reducer
const chiefWardenPersistConfig = {
  key: 'chiefwardens',
  storage,
};

// Create persisted chiefWarden reducer
const persistedChiefWardensReducer = persistReducer(chiefWardenPersistConfig, chiefWardenReducer);


// Configuration for persisting Warden reducer
const wardenPersistConfig = {
  key: 'wardens',
  storage,
};

// Create persisted chiefWarden reducer
const persistedWardensReducer = persistReducer(wardenPersistConfig, wardenReducer);


// Configuration for persisting hostel reducer
const hostelPersistConfig = {
  key: 'hostels',
  storage,
};

// Create persisted chiefWarden reducer
const persistedHostelsReducer = persistReducer(hostelPersistConfig, hostelReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    students: persistedStudentReducer,
    complaints: persistedComplaintsReducer,
    chiefwardens: persistedChiefWardensReducer,
    wardens: persistedWardensReducer,
    hostels: persistedHostelsReducer
  },
});

// Create a persistor
// const persistor = persistStore(store);
const persistor = persistStore(store, null, () => {
  // console.log('Persistor is now finished rehydrating the state');
});


// Export the store and persistor
export { store, persistor };
