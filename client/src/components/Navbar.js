import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const Navbar = () => {
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
    // backgroundColor: 'black',
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
    marginLeft:'20px',
    marginRight:'20px',
    WebkitAppearance: 'none', /* Hides dropdown arrow on WebKit browsers */
    MozAppearance: 'none', /* Hides dropdown arrow on Mozilla Firefox */
    appearance: 'none', /* Hides dropdown arrow on other browsers */
  };

  const optionStyle = {
    color: 'black', // Set the text color for options
    
    // backgroundColor: '#001F3F', // Set the background color for options
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
      <div className="nav-links p-2 text-light" style={{backgroundColor : ''}} >
        <a href="/register" style={linkStyle}>Register</a>
        <select style={selectStyle} onChange={(e) => window.location.href = e.target.value} className='text-center'>
          <option value="#login" disabled selected hidden>Login</option>
          <option className='text-light' style={optionStyle}>
            <Link to="/admin" >admin</Link>
          </option>
          <option className='text-light' style={optionStyle}>
              <Link to="/student" >Student</Link>
          </option>
        </select>
      </div>
    </nav>

    </div>
    <div style={{ paddingTop: "80px" }}>{/*  */}</div>

    </>
  );
}

export default Navbar;
