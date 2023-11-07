import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import img1 from '../images/img1.png'; // import the image
import img2 from '../images/img2.png'; // import the image
import Footer from './Footer';

const Home = () => {
  const [feedbackText, setFeedbackText] = useState('');
//   const quoteStyle = {
//     color: 'white',
//     fontSize: '44px',
//     fontWeight: 'bold',
//     fontFamily: 'cursive',
//   };

  const pageStyle = {
    // backgroundColor: '#001F3F',
    padding: '0',
    color: 'white',
    backgroundColor: '#001F3F', // Dark blue color
    height: '100vh',
  };

  useEffect(() => {
    const text = "YOUR FEEDBACK MATTERS!";
    let count = 0;

    const interval = setInterval(() => {
      if (count <= text.length) {
        setFeedbackText(text.substring(0, count));
        count++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={pageStyle}>
      <Navbar />

      <div className="container-fluid mt-2">
        <div className="row text-center justify-content-center mt-4">
          <div className="col-md-6 mt-5 ">
            <p className='text-center'>
              <h1 style={{ fontFamily: '' }}>{feedbackText}</h1>
              <hr/>
              <span style={{ fontSize: '25px', lineHeight: '2', fontFamily: '' }}>
                If you have any concerns or suggestions about our mess facilities, we're here to help. <br /> Together, let's enhance your dining experience.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="container mb-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={img1} alt="Hostel Image" style={{ width: '50%', height: 'auto' }} />
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={img2} alt="Hostel Image" style={{ width: '50%', height: 'auto' }} />
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-md-12 p-0">
                <Footer/>
            </div>
        </div>
      </div>
    </div>

    
  );
};

export default Home;
