import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function Feedback() {
  const [showModal, setShowModal] = useState(false);
  const [morningRating, setMorningRating] = useState(2);
  const [lunchRating, setLunchRating] = useState(2);
  const [eveningRating, setEveningRating] = useState(2);
  const [dinnerRating, setDinnerRating] = useState(2);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleComplaint = (e) => {
    e.preventDefault();
    //send data to server
    console.log({
      morningRating,
      lunchRating,
      eveningRating,
      dinnerRating
    });
    closeModal();
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button onClick={openModal}>Feedback</Button>
      <Modal show={showModal} onHide={closeModal}>
        <form onSubmit={handleComplaint}>
          <Modal.Header closeButton style={{ backgroundColor: '#3498db', color: 'white' }}>
            <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Give your feedback:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Typography component="legend">Morning Breakfast:</Typography>
            <StyledRating
              name="morning"
              value={morningRating}
              onChange={(event, newValue) => {
                setMorningRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /><br/>
            <Typography component="legend">Lunch:</Typography>
            <StyledRating
              name="lunch"
              value={lunchRating}
              onChange={(event, newValue) => {
                setLunchRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /><br/>
            <Typography component="legend">Evening Breakfast:</Typography>
            <StyledRating
              name="evening"
              value={eveningRating}
              onChange={(event, newValue) => {
                setEveningRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /><br/>
            <Typography component="legend">Dinner:</Typography>
            <StyledRating
              name="dinner"
              value={dinnerRating}
              onChange={(event, newValue) => {
                setDinnerRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" style={{ borderRadius: '5px' }}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}