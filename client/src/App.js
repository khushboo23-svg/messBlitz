import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './redux/store'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AdminLogin from './components/Login/AdminLogin';
import StudentLogin from './components/Login/StudentLogin';
import Register from './components/Register';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
