import React, { useState, useEffect, useRef } from "react";
import "../css/Complaintcard.css";
// import "font-awesome/css/font-awesome.min.css";  
import { Button, Modal } from "react-bootstrap";


function Complaintcard() {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  // Function to increase the up count
  const handleUpClick = () => {
    setUpCount(upCount + 1);
  };

  // Function to increase the down count
  const handleDownClick = () => {
    setDownCount(downCount + 1); // Increment the down count, not up count
  };

  const openComment = () => {
    setShowComment(!showComment);
    setButtonVisible(!buttonVisible);
  };

  return (
    <div className="card-component">
      <div className="card container">
        <div className="card-body ">
          <div className="title-date-vote-user">
            <h1 className="card-title">Card title</h1>
            <p>37/44/3321</p>
          </div>
          <hr />
          <div className="description  ">
            <p className="card-text fs-5 fw-light">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          {/* <hr /> */}
        </div>
        <div className="row image ">
          <img
            src="https://codingyaar.com/wp-content/uploads/chair-image.jpg"
            className="img-fluid col-2"
            alt="..."
          />
          <img
            src="https://codingyaar.com/wp-content/uploads/chair-image.jpg"
            className="img-fluid col-2"
            alt="..."
          />
          <img
            src="https://codingyaar.com/wp-content/uploads/chair-image.jpg"
            className=" img-fluid col-2"
            alt="..."
          />
        </div>
        <div className="title-date-vote-user  row">
          {/* <hr className="hr-padding mt-2"/> */}
          <div className="votebtn col-3 mt-2">
            <h2>
              <i className="fa-solid fa-circle-up" onClick={handleUpClick}></i>{" "}
              {upCount}
            </h2>
            <h2>
              <i
                className="fa-solid fa-circle-down"
                onClick={handleDownClick}
              ></i>{" "}
              {downCount}
            </h2>
          </div>
          <div className="col-5 offset-4">
            <h2>made by ABCDEFG HIKLMN</h2>
          </div>
        </div>
        {/* <hr /> */}
        <div className="comment  text-decoration-none text-lowercase">
          {buttonVisible && (
            <Button
              variant="link"
              className="text-decoration-none text-lowercase fs-4"
              onClick={openComment}
            >
              View all comments
            </Button>
          )}
        </div>
        {showComment && (
          <div className="mb-3">
            <Button onClick={openComment}>close</Button>
            <hr />
            <h1>comment 1</h1>
            <hr />
            <h1>comment 1</h1>
            <hr />
            <h1>comment 1</h1>
            <hr />
            <h1>comment 1</h1>
            <hr />
            <h1>comment 1</h1>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
}

export default Complaintcard;
