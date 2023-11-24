import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
    width: '100%',
    // position: 'fixed', // or 'absolute' if you want it to be at the end of the content
    bottom: '0px',
    marinBottom : '0'
  };

  const containerStyle = {
    paddingBottom: '0', // Adjust this value based on the height of your footer
  };

  const copyrightStyle = {
    fontSize: '14px',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Your page content here */}
      <footer style={footerStyle}>
        <div>
          {/* <p>About Us | Services | Contact</p> */}
          <p>Address: 123 Street Name, City, Country</p>
          <p>Email: contact@messblitz.com</p>
        </div>
        <p style={copyrightStyle}>&copy; {new Date().getFullYear()} MessBlitz. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
