import './App.css';

import {BrowserRouter, Routes ,Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AdminLogin from './components/Login/AdminLogin';
import StudentLogin from './components/Login/StudentLogin';
import Register from './components/Register';



function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route  path='' element={<Home/>}/>
            {/* <Route  path="/register" element={<Register/>}/> */}
            <Route  path="/dashboard" element={<Dashboard/>}/>
            <Route  path="/admin" element={<AdminLogin/>}/>
            <Route  path="/student" element={<StudentLogin/>}/>
            <Route  path="/register" element={<Register/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
