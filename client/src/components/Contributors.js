import React from 'react';
import styled, { keyframes } from 'styled-components';
import githubImg from '../images/github.png';
import linkedinImg from '../images/Linkedin.png';
import Footer from './Footer';

// Define the keyframe animation
const hoverAnimation = keyframes`
  0% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(255, 255, 255, 0.1);
  }
  100% {
    background-color: transparent;
  }
`;

const CardContainer = styled.div`
  background-color: transparent;
  ${'' /* border: 1px solid blue; */}
  border-radius: 20px;
  box-shadow: inset 0 0 6px 0px rgb(210, 214, 191);
  animation: ${hoverAnimation} 4s infinite; 
`;

const Contributor = ({ name, contribution, linkedin, github, imageSrc }) => {
  return (
    <CardContainer className="col-md-3 text-center p-5 m-2">
      <img src={imageSrc} alt={name} style={{ width: '50%', height: 'auto', borderRadius: '50%' }} />
      <h3 className="p-2">{name}</h3>
      <p>{contribution}</p>
      <p className="m-4">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="m-2">
          <img src={linkedinImg} alt="LinkedIn" style={{ width: '30px', height: '30px' }} />
        </a>
        <span>&nbsp;</span>
        <a href={github} target="_blank" rel="noopener noreferrer" className="m-2">
          <img src={githubImg} alt="GitHub" style={{ width: '30px', height: '30px' }} />
        </a>
      </p>
    </CardContainer>
  );
};

const Contributors = () => {
    return (
      <div>
        <div className="container-fluid shadow-lg" style={{ height: '100vh', backgroundColor: '#001F3F' }}>
          <div className="row">
            <div className="col-md-12 text-center text-light mt-2">
              <h1 className="m-5" style={{ backgroundColor: '#001f5f', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                Contributors Corner
              </h1>
            </div>
          </div>
          <div className="row justify-content-center text-light">
            <Contributor
              name="Bharat Adhikari"
              contribution="Backend Developer, Crafting Robust APIs and Data Management"
              linkedin="https://www.linkedin.com/in/bharat-adhikari-54968a1b5/"
              github="https://github.com/AdBharat14"
              imageSrc="https://avatars.githubusercontent.com/u/70108489?v=4"
            />
            {/* Add more Contributor components as needed */}
            <Contributor
              name="Khushboo Kumari"
              contribution="React UI Design and Redux-Managed Data Integration"
              linkedin="https://www.linkedin.com/in/khushboo-kumari-4a29021ba/"
              github="https://github.com/khushboo23-svg"
              imageSrc="https://media.licdn.com/dms/image/C5603AQGvdAoZOYOYNA/profile-displayphoto-shrink_800_800/0/1659719898343?e=1706140800&v=beta&t=kNUlI67Fa88RYmwwVpvSJyHBAXDzUKzIgbk31mws_Tk"
            />
            <Contributor
              name="Puneet Chauhan"
              contribution="Designing React Components for Enhanced User Interaction"
              linkedin="https://www.linkedin.com/in/puneet-chauhan-a03a69226/"
              github="https://github.com/puneet2003"
              imageSrc="https://media.licdn.com/dms/image/D4D03AQF-5B4MKTwRMA/profile-displayphoto-shrink_800_800/0/1697801901167?e=1706140800&v=beta&t=xLNdYreS_c6ViKFfIml5lwaKLG5Oqw1dTF3eQDcTjuY"
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Contributors;
  