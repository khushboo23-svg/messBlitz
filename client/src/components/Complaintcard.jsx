// import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { add_comment, add_complaint, delete_complaint } from "../redux/complaintSlice";
// import axios from "axios";
// import "../css/Complaintcard.css";
// import { toast } from "react-toastify";

// const Complaintcard = ({ complaint, showMyComplaints }) => {
//   const [upCount, setUpCount] = useState(0);
//   const [downCount, setDownCount] = useState(0);
//   const [showComment, setShowComment] = useState(false);
//   const [buttonVisible, setButtonVisible] = useState(true);
//   const [showCommentPopup, setShowCommentPopup] = useState(false);
//   const [newComment, setNewComment] = useState("");

//   const dispatch = useDispatch();

//   const handleUpClick = () => {
//     setUpCount(upCount + 1);
//   };

//   const handleDownClick = () => {
//     setDownCount(downCount + 1);
//   };

//   const openComment = () => {
//     setShowComment(!showComment);
//     setButtonVisible(!buttonVisible);
//   };

//   const handleDelete = () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this complaint?"
//     );

//     if (confirmDelete) {
//       dispatch(delete_complaint(complaint._id));

//       axios
//         .delete(`http://localhost:5500/student/deleteComplaint/${complaint._id}`)
//         .then(() => {
//           console.log("complaint deleted");
//         })
//         .catch((error) => {
//           console.error("Error deleting complaint on the server:", error);
//         });
//     }
//   };

//   const openCommentPopup = () => {
//     setShowCommentPopup(true);
//   };

//   const closeCommentPopup = () => {
//     setShowCommentPopup(false);
//   };

//   const handleAddComment = () => {
//     axios
//       .post("http://localhost:5500/student/addComment", {
//         complaintId: complaint._id, 
//         comment: newComment,
//         writtenBy: "", 
//       })
//       .then((res) => {
//         dispatch(add_comment(res.data.data.comments))
//         // console.log(res.data);
//         console.log(res.data.data.comments);
//         console.log("Comment added");
//       })
//       .catch((err) => {
//         console.log("Can't add comment:", err);
//       });
//     closeCommentPopup();
//   };
  

//   return (
//     <div className="card-component">
//       <div className="card container">
//         <div className="card-body">
//           <div className="title-date-vote-user">
//             <h3 className="card-title">{complaint.title}</h3>
//             <p>{complaint.date}</p>
//           </div>
//           <hr />
//           <div className="description">
//             <p className="card-text fs-6 fw-light">{complaint.description}</p>
//           </div>
//         </div>
//         <div className="title-date-vote-user  row">
//           <div className="votebtn col-3 mt-2 ">
//             <h4>
//               <i className="fa-solid fa-circle-up" onClick={handleUpClick}></i>{" "}
//               {upCount}
//             </h4>
//             <h4>
//               <i
//                 className="fa-solid fa-circle-down"
//                 onClick={handleDownClick}
//               ></i>{" "}
//               {downCount}
//             </h4>
//           </div>
//           <div className="col-md-4 offset-4 ">
//             <p className="text-light" style={{ fontSize: "15px" }}>
//               Made By : Bharat (2022ca019)
//             </p>
//             {showMyComplaints && (
//               <Button
//                 variant="danger"
//                 size="sm"
//                 onClick={handleDelete}
//                 className="shadow-lg"
//               >
//                 Delete this complaint
//               </Button>
//             )}
//           </div>
//         </div>
//         <div className="comment text-decoration-none text-lowercase">


        
//           {buttonVisible && (
//             <>
//               <Button
//                 variant="link"
//                 className="text-decoration-none text-lowercase fs-6"
//                 onClick={openComment}
//               >
//                 View all comments
//               </Button>
//               <Button
//                 variant="link"
//                 className="text-decoration-none text-lowercase fs-6"
//                 onClick={openCommentPopup}
//               >
//                 Add a comment
//               </Button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Comment Popup */}
//       <Modal show={showCommentPopup} onHide={closeCommentPopup}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add a comment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <textarea
//           style={{width: "100%"}}
//             placeholder="Type your comment here"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="success" onClick={handleAddComment}>
//             Add Comment
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Complaintcard;







import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add_comment, delete_complaint } from "../redux/complaintSlice";
import axios from "axios";
import "../css/Complaintcard.css";

const Complaintcard = ({ complaint, showMyComplaints }) => {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const dispatch = useDispatch();

  const handleUpClick = () => {
    setUpCount(upCount + 1);
  };

  const handleDownClick = () => {
    setDownCount(downCount + 1);
  };

  const openComment = () => {
    axios
      .get(`http://localhost:5500/student/getComments/${complaint._id}`)
      .then((res) => {
        console.log("opening all comments");
        setComments(res.data.data.comments);
        setShowCommentModal(true);
      })
      .catch((err) => {
        console.log("Error fetching comments:", err);
      });
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

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  

  return (
    <div className="card-component">
      <div className="card container">
        <div className="card-body">
          <div className="title-date-vote-user">
            <h3 className="card-title">{complaint.title}</h3>
            <p>{complaint.date}</p>
          </div>
          <hr />
          <div className="description">
            <p className="card-text fs-6 fw-light">{complaint.description}</p>
          </div>
        </div>
        <div className="title-date-vote-user  row">
          <div className="votebtn col-3 mt-2 ">
            <h4>
              <i className="fa-solid fa-circle-up" onClick={handleUpClick}></i>{" "}
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
              Made By : Bharat (2022ca019)
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
            View all comments
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-lowercase fs-6"
            onClick={openCommentPopup}
          >
            Add a comment
          </Button>
        </div>
      </div>

      {/* View Comments Modal */}
      <Modal show={showCommentModal} onHide={closeCommentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comments for {complaint.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.comment}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      {/* Comment Popup */}
      <Modal show={showCommentPopup} onHide={closeCommentPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Add a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            style={{ width: "100%" }}
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Complaintcard;
