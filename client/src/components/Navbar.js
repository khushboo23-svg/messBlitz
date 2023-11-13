import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/studentSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => !!state.students.token);

  const handleLogout = () => {
    // Dispatch the logout action to reset user-related information
    dispatch(logout());
    // Redirect to the home page or login page
    navigate('/');
  };

  return (
    <>
      <div style={displayNavbar}>
        <nav style={navbarStyle} className="text-light">
          <div className="logo">
            <h2>
              <span>MESS</span>
              <span style={{ backgroundColor: 'skyblue', color: 'black', borderRadius: '8px', marginLeft: '4px' }}>BLITZ</span>
            </h2>
          </div>
          <div className="nav-links p-2 text-light">
            {/* Check if the user is authenticated */}
            {isAuthenticated ? (
              // If authenticated, show Logout tab
              <button className="text-light" style={logoutStyle} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              // If not authenticated, show Home, Register, and Login tabs
              <>
                <Link to="/" style={linkStyle}>
                  Home
                </Link>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
                <select style={selectStyle} onChange={(e) => window.location.href = e.target.value} className='text-center'>
                  <option value="#login" disabled selected hidden>Login</option>
                  <option className='text-light' style={optionStyle}>
                    <Link to="/admin">Admin</Link>
                  </option>
                  <option className='text-light' style={optionStyle}>
                    <Link to="/student">Student</Link>
                  </option>
                </select>
              </>
            )}
          </div>
        </nav>
      </div>
      <div style={{ paddingTop: "80px" }}>{/*  */}</div>
    </>
  );
};

const displayNavbar = {
  position: "fixed",
  top: 0,
  width: "100%",
  height: "80px",
  boxShadow: "0px 4px 4px rgba(255, 255, 255, 0.3)",
  backgroundColor: "#001F3F",
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
