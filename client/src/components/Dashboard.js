import React, { useState } from 'react';
// import Navbar from './Navbar';
import defaultProfilePic from '../images/user.png';
// import Footer from './Footer';
import { Button, Modal } from 'react-bootstrap';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#001F3F',
    color: 'white',
  };

  const heading = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  };

  const profilePicStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const inputStyle = {
    border: 'none',
    borderBottom: '2px solid #001F3F',
    backgroundColor: 'transparent',
    color: 'black',
    outline: 'none',
    width: '100%',
    marginBottom: '10px',
    paddingTop: '5px',
  };

  return (
    <div style={pageStyle}>
      {/* <Navbar /> */}
      <div className="container mt-5" style={heading}>
        <div className="row">
          <div className="col-md-6">
            <p style={{ fontSize: '30px' }}>RAMAN HOSTEL</p>
          </div>
          <div className="col-md-5" align="right">
            <p>Registration Number: 2022ca001</p>
            <p>Name: Bharat Adhikari</p>
          </div>
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <img src={defaultProfilePic} alt="Profile" style={profilePicStyle} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
                <button className='btn btn-primary m-1'>My Complaints</button>
                <button className='btn btn-primary m-1'>All Complaints</button>
                <button className='btn btn-primary m-1'>View Mess Menu</button>
                <button className="position-fixed" style={{ bottom: '180px', right: '20px' }} onClick={openModal}>
        Add complaint
      </button>
            </div>
        </div>
      </div>

      
      

      <div className="flex-grow-1"></div>

      <Button className="position-fixed" style={{ bottom: '180px', right: '20px' }} onClick={openModal}>
        Add complaint
      </Button>

      {/* <Footer /> */}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder="Problem" style={inputStyle} required/>
          <textarea type="text" placeholder="Description" style={inputStyle} required/>
          <label htmlFor="">Upload image if any</label> <br /> <br />
          <input type="file" accept="image/*" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={closeModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
