import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/studentSlice';
// import { logout } from '../redux/chiefWardenSlice';
import axios from 'axios';




const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useSelector((state)=>{
    // console.log(state);
  })
  const isAuthenticatedStudent = useSelector((state) => state.students.token !== null);
  const isAuthenticatedChiefWarden = useSelector((state) => state.chiefwardens.token !== null);
  const location = useLocation();

  const handleLogout = () => {
    // Dispatch the logout action to reset user-related information
    console.log("Before logging out : "+localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('token');
    axios.post('http://localhost:5500/logout')
    .then((res)=>{
      console.log(res);
      dispatch(logout());
      // Redirect to the home page or login page
      console.log("Logged out successfully");
      console.log("After logging out : "+localStorage.getItem('token'));
      navigate('/');
    })
    .catch((err)=>{
      console.log(err);
    })
    
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
              <span>MESS</span>
              <span style={{ backgroundColor: 'skyblue', color: 'black', borderRadius: '8px', marginLeft: '4px' }}>BLITZ</span>
            </h2>
          </div>
          <div className="nav-links p-2 text-light">
            {((location.pathname === '/dashboard' && isAuthenticatedStudent) || (location.pathname ==='/admindashboard' && isAuthenticatedChiefWarden)) ? (
              // If on the dashboard, show Logout tab
              <button className="text-light" style={logoutStyle} onClick={handleLogout}>
                Logout
              </button>
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

                <Link
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
      <Link
        to="/register"
        style={{
          ...linkStyle,
          color: isHovered === '/register' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/register')}
        onMouseLeave={handleMouseLeave}
      >
        Register
      </Link>
                
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
