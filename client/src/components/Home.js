import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import img1 from '../images/img1.png'; // import the image
import img2 from '../images/img2.png'; // import the image
import Footer from './Footer';
import styled, { keyframes } from 'styled-components';

const Home = () => {
  const [feedbackText, setFeedbackText] = useState('');



const CardContainer = styled.div`
  background-color: transparent;
  box-shadow: inset 0 0 6px 0px rgb(210, 214, 191);
`;


  const pageStyle = {
    backgroundColor: '#001F3F',
    padding: '0',
    color: 'white',
    backgroundColor: '#001F3F', 
    height: '100%',
  };

  useEffect(() => {
    const text = "YOUR FEEDBACK MATTERS!...";
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
      {/* <Navbar /> */}

      <div className="container">
        <div className="row text-center justify-content-center">
          <div className="col-md-12 mt-3 ">
            <p className='text-center'>
              <h1 style={{ backgroundColor : "#004080",width : "100%" , borderRadius : "10px"}} className='p-3'>{feedbackText}</h1>
              {/* <hr/> */}
              {/* <span style={{ fontSize: '25px', lineHeight: '2', fontFamily: '' }}>
                If you have any concerns or suggestions about our mess facilities, we're here to help. <br /> Together, let's enhance your dining experience.
              </span> */}
            </p>
          </div>
        </div>
      </div>

      <div className="container mb-3 mt-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={img1} alt="Hostel Image" style={{ width: '50%', height: 'auto' }}  />
          </div>
          <CardContainer className="col-md-6  text-center shadow-lg d-flex justify-content-center align-items-center" style={{borderTopRightRadius : "20px"}}>
            <p className='m-5' style={{color : "white", fontSize : "18px"}}>"If you have any concerns or suggestions about our mess facilities, we're here to help. <br /> Together, let's enhance your dining experience.!"</p>
          </CardContainer>
          <CardContainer className="col-md-6  text-center shadow-lg d-flex justify-content-center align-items-center" style={{borderBottomLeftRadius : "20px"}}>
            <p className='m-5' style={{color : "white", fontSize : "18px"}}>"Wholesome Meals, Vibrant Campus: Unleash the Power of Our Advanced Mess Management Services to Fuel Your College Lifestyle!"</p>
          </CardContainer>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={img2} alt="Hostel Image" style={{ width: '50%', height: 'auto' }}  />
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



