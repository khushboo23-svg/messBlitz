// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import studentReducer from './studentSlice';
// import complaintsReducer from './complaintSlice'; // Import your complaints reducer
// import chiefWardenReducer from './chiefWardenSlice';

// const studentPersistConfig = {
//   key: 'students',
//   storage,
// };

// const persistedStudentReducer = persistReducer(studentPersistConfig, studentReducer);

// const complaintsPersistConfig = {
//   key: 'complaints',
//   storage,
// };

// const persistedComplaintsReducer = persistReducer(complaintsPersistConfig, complaintsReducer);

// const chiefWardenPersistConfig = {
//   key: 'chiefwardens',
//   storage,
// };

// const persistedChiefWardensReducer = persistReducer(chiefWardenPersistConfig, chiefWardenReducer);

// const store = configureStore({
//   reducer: {
//     students: persistedStudentReducer,
//     complaints: persistedComplaintsReducer,
//     chiefwardens: persistedChiefWardensReducer
//   },
// });

// const persistor = persistStore(store);

// export { store, persistor };



// Import necessary modules
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import your reducers
import studentReducer from './studentSlice';
import complaintsReducer from './complaintSlice';
import chiefWardenReducer from './chiefWardenSlice';

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

// Configure the Redux store
const store = configureStore({
  reducer: {
    students: persistedStudentReducer,
    complaints: persistedComplaintsReducer,
    chiefwardens: persistedChiefWardensReducer
  },
});

// Create a persistor
// const persistor = persistStore(store);
const persistor = persistStore(store, null, () => {
  console.log('Persistor is now finished rehydrating the state');
});


// Export the store and persistor
export { store, persistor };
