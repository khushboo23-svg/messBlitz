import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
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
    WebkitAppearance: 'none', /* Hides dropdown arrow on WebKit browsers */
    MozAppearance: 'none', /* Hides dropdown arrow on Mozilla Firefox */
    appearance: 'none', /* Hides dropdown arrow on other browsers */
  };

  const optionStyle = {
    color: 'black', // Set the text color for options
    // backgroundColor: '#001F3F', // Set the background color for options
  };

  return (
    <nav style={navbarStyle} className="text-light">
      <div className="logo">
        <h2>
          <span>MESS</span>
          <span style={{ backgroundColor: 'skyblue', color: 'black', borderRadius: '8px', marginLeft: '4px' }}>BLITZ</span>
        </h2>
      </div>
      <div className="nav-links p-2 text-light" style={{backgroundColor : ''}} >
        <a href="#register" style={linkStyle}>Register</a>
        <select style={selectStyle} onChange={(e) => window.location.href = e.target.value} className='text-center'>
          <option value="#login" disabled selected hidden>Login</option>
          <option value="#admin" className='text-light' style={optionStyle}>AdminLogin</option>
          <option value="#student" className='text-light' style={optionStyle}>StudentLogin</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
