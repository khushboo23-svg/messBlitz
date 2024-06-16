import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { logoutStudent } from '../redux/studentSlice';
import { logoutWarden } from '../redux/wardenSlice';
import axios from 'axios';
import '../css/dashboard.css'




const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  useSelector((state)=>{
    console.log(state);
  })

  const wToken = useSelector((state)=> state.wardens);
  console.log(wToken);
  const isAuthenticatedStudent = useSelector((state) => state.students.token !== null);
  const isAuthenticatedWarden = useSelector((state) => state.wardens.token !== null);

  const handleLogout = () => {
    axios.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('token');
    axios.post(`${process.env.REACT_APP_BACK_END_URL}/logout`)
    .then((res) => {
      console.log("Logged out successfully");
      if (isAuthenticatedStudent) {
        dispatch(logoutStudent());
      }
      if (isAuthenticatedWarden) {
        dispatch(logoutWarden());
      }
      navigate('/');
    })
    .catch((err) => {
      console.error("Error logging out:", err);
    });
  };

  const [isHovered, setIsHovered] = React.useState(null);

  const handleMouseEnter = (link) => {
    setIsHovered(link);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <>
      <div style={displayNavbar}>
        <nav style={navbarStyle} className="text-light">
          <div className="logo">
            <h2>
              <span>Mess</span>
              <span style={{ backgroundColor: 'skyblue', color: 'black', borderRadius: '8px', marginLeft: '4px' }}>Blitz</span>
            </h2>
          </div>
          <div className="nav-links p-2 text-light nav_changes">
            {((location.pathname === '/dashboard' && isAuthenticatedStudent) || (location.pathname==='/warden') && isAuthenticatedWarden) ? (
              // If on the dashboard, show Logout tab
              <>
              <button className="text-light" style={logoutStyle} onClick={handleLogout}>
                Logout
              </button>
              {/* <button className="text-light" style={logoutStyle} onClick={openModal}>
              Feedback
            </button> */}
            </>
            ) : (
              // If not authenticated or not on the dashboard, show Home, Register, and Login tabs
              <>
                {/* <Link to="/" style={linkStyle}>
                  Home
                </Link>
                <Link to="/contributors" style={linkStyle}>
                  Contributors
                </Link>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link> */}

                <Link  className='link-name'
        to="/"
        style={{
          ...linkStyle,
          color: isHovered === '/' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/')}
        onMouseLeave={handleMouseLeave}
      >
        Home
      </Link>
      <Link
        to="/contributors"
        style={{
          ...linkStyle,
          color: isHovered === '/contributors' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/contributors')}
        onMouseLeave={handleMouseLeave}
      >
        Contributors
      </Link>
      {/* <Link
        to="/register"
        style={{
          ...linkStyle,
          color: isHovered === '/register' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/register')}
        onMouseLeave={handleMouseLeave}
      >
        Register
      </Link> */}
                
                <select
                  style={selectStyle}
                  onChange={(e) => (window.location.href = e.target.value)}
                  className="text-center"
                >
                  <option value="#login" disabled selected hidden>
                    Login
                  </option>
                  <option className="text-light" style={optionStyle}>
                    <Link to="/admin">Admin</Link>
                  </option>
                  <option className="text-light" style={optionStyle}>
                    <Link to="/student">Student</Link>
                  </option>
                </select>
              </>
            )}
          </div>
        </nav>
      </div>
      <div style={{ paddingTop: '80px' }}>{/*  */}</div>
    </>
  );
};

const displayNavbar = {
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '80px',
  backgroundColor: '#001F3F',
  opacity: 1,
  zIndex: 1,
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
};


const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '18px',
  padding: '10px',

  hover: {
    color : 'skyblue'
  },
};

const selectStyle = {
  color: 'white',
  backgroundColor: '#001F3F',
  border: 'none',
  outline: 'none',
  fontSize: '18px',
  marginLeft: '20px',
  marginRight: '20px',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
};

const optionStyle = {
  color: 'black',
};

const logoutStyle = {
  color: 'white',
  backgroundColor: '#001F3F',
  border: 'none',
  outline: 'none',
  fontSize: '18px',
  marginLeft: '20px',
  marginRight: '20px',
  cursor: 'pointer',
};

export default Navbar;
