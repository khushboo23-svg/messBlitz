import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add_comment, delete_complaint } from "../redux/complaintSlice";
import axios from "axios";
import styled, { keyframes } from 'styled-components';
import "../css/Complaintcard.css";


// Apply the animation to the CardContainer
const CardContainer = styled.div`
  background-color: transparent;
  border: 1px solid blue;
  border-radius: 20px;
  box-shadow: inset 0 0 6px 0px rgb(210, 214, 191);
  transition: background-color 0.3s ease;
  /* Adjust the duration as needed */

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const Complaintcard = ({ complaint, showMyComplaints }) => {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentsOnCard, setShowCommentsOnCard] = useState(false); 
  const [studentName, setStudentName] = useState("");
  const dispatch = useDispatch();

  console.log(complaint.comments);

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/student/getStudent/${complaint.studentId}`
        );
        setStudentName(response.data.studentName);
      } catch (error) {
        console.error("Error fetching student name:", error);
      }
    };

    fetchStudentName();
  }, [complaint.studentId]);

  const handleUpClick = () => {
    setUpCount(upCount + 1);
  };

  const handleDownClick = () => {
    setDownCount(downCount + 1);
  };

  const openComment = () => {
    setShowCommentsOnCard((prev) => !prev);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (confirmDelete) {
      dispatch(delete_complaint(complaint._id));

      axios
        .delete(`http://localhost:5500/student/deleteComplaint/${complaint._id}`)
        .then(() => {
          console.log("complaint deleted");
        })
        .catch((error) => {
          console.error("Error deleting complaint on the server:", error);
        });
    }
  };

  const openCommentPopup = () => {
    setShowCommentPopup(true);
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
  };

  const handleAddComment = () => {
    axios
      .post("http://localhost:5500/student/addComment", {
        complaintId: complaint._id,
        comment: newComment,
        writtenBy: "", // Replace with the actual user identifier
      })
      .then((res) => {
        dispatch(add_comment(res.data.data.comments));
        console.log("Comment added");
      })
      .catch((err) => {
        console.log("Can't add comment:", err);
      });
    closeCommentPopup();
  };

  const formattedDate = new Date(complaint.updatedAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedTime = new Date(complaint.updatedAt).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  return (
    <div className="card-component shadow-lg">
      <CardContainer className="card container">
        <div className="card-body">
          <div className="title-date-vote-user">
            <h3 className="card-title">{complaint.title}</h3>
            <p
              style={{
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
              }}
              className="shadow-lg"
            >
              {formattedDate} | {formattedTime}
            </p>
          </div>
          <hr />
          <div className="description">
            <p className="card-text fs-6 fw-light">{complaint.description}</p>
          </div>
        </div>
        <div className="title-date-vote-user  row">
          <div className="votebtn col-3 mt-2 ">
            <h4>
              <i
                className="fa-solid fa-circle-up"
                onClick={handleUpClick}
              ></i>{" "}
              {upCount}
            </h4>
            <h4>
              <i
                className="fa-solid fa-circle-down"
                onClick={handleDownClick}
              ></i>{" "}
              {downCount}
            </h4>
          </div>
          <div className="col-md-4 offset-4 ">
            <p className="text-light" style={{ fontSize: "15px" }}>
              By : {complaint.studentName}
              <br />
              <i className="text-primary">[Reg No.: {complaint.studentRegNo}]</i>
            </p>
            {showMyComplaints && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                className="shadow-lg"
              >
                Delete this complaint
              </Button>
            )}
          </div>
        </div>
        <div className="comment text-decoration-none text-lowercase">
          <Button
            variant="link"
            className="text-decoration-none text-lowercase fs-6"
            onClick={openComment}
          >
            {showCommentsOnCard ? "Hide comments" : "View all comments"}
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-lowercase fs-6"
            onClick={openCommentPopup}
          >
            Add a comment
          </Button>
          {showCommentsOnCard && (
            <div className="comments">
              <hr />
              <ul>
                {complaint.comments.map((comment, index) => (
                  <li key={index} style={{ fontWeight: "bold", color: "white" }}>
                    {comment.comment}
                    <pre style={{ color: "grey", fontWeight: "normal" }}>
                      <i>Comment By: {comment.writtenBy}</i>
                    </pre>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContainer>

      <Modal show={showCommentPopup} onHide={closeCommentPopup}>
        <Modal.Header closeButton style={{ backgroundColor: '#3498db', color: 'white' }}>
          <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Add a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ display: 'block', marginBottom: '10px' }}>Type your comment here:</label>
          <textarea
            style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddComment} style={{ borderRadius: '5px' }}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Complaintcard;
