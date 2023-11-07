// import React from 'react';

// const Footer = () => {
//   const footerStyle = {
//     // backgroundColor: 'black',
//     // color: 'white',
//     // padding: '20px',
//     // textAlign: 'center',
//     // // position: 'fixed',
//     // bottom: '0',
//     // width: '100%',
//     // marginBottom : '0'

//     backgroundColor: 'black',
//     color: 'white',
//     padding: '20px 0',
//     textAlign: 'center',
//     width: '100%',
//     // position: 'fixed',
//     bottom: '0',
//     heiht : '100vh'
//   };

//   return (
//     <footer style={footerStyle}>
//       <p>This is the footer. You can add your content here Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis necessitatibus nisi enim! Tenetur eum fugit voluptates rem, sequi sunt. Minus ullam ab accusamus, debitis officiis at rem ratione quam voluptas..</p>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
    width: '100%',
    // position: 'fixed',
    bottom: '0',
    // overflow-x: hidden ,
  };

  const copyrightStyle = {
    fontSize: '14px',
    marginTop: '10px',
  };

  return (
    <footer style={footerStyle}>
      <div>
        {/* <p>About Us | Services | Contact</p> */}
        <p>Address: 123 Street Name, City, Country</p>
        <p>Email: contact@messblitz.com</p>
      </div>
      <p style={copyrightStyle}>&copy; {new Date().getFullYear()} MessBlitz. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
