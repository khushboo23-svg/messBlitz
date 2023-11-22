// import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import "../css/Complaintcard.css";

// function Complaintcard({ complaint }) {
//   const [upCount, setUpCount] = useState(0);
//   const [downCount, setDownCount] = useState(0);
//   const [showComment, setShowComment] = useState(false);
//   const [buttonVisible, setButtonVisible] = useState(true);

//   // Function to increase the up count
//   const handleUpClick = () => {
//     setUpCount(upCount + 1);
//   };

//   // Function to increase the down count
//   const handleDownClick = () => {
//     setDownCount(downCount + 1);
//   };

//   const openComment = () => {
//     setShowComment(!showComment);
//     setButtonVisible(!buttonVisible);
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
//         {/* <div className="row image">
//           {complaint.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               className="img-fluid col-2"
//               alt={`Image ${index + 1}`}
//             />
//           ))}
//         </div> */}
//         <div className="title-date-vote-user  row">
//           <div className="votebtn col-3 mt-2 ">
//             <h4>
//               <i
//                 className="fa-solid fa-circle-up"
//                 onClick={handleUpClick}
//               ></i>{" "}
//               {upCount}
//             </h4>
//             <h4>
//               <i
//                 className="fa-solid fa-circle-down"
//                 onClick={handleDownClick}
//               ></i>{" "}
//               {downCount}
//             </h4 >
//           </div>
//           <div className="col-5 offset-4 ">
//             <h5>made by {complaint.studentName}</h5>
//           </div>
//         </div>
//         <div className="comment text-decoration-none text-lowercase">
//           {buttonVisible && (
//             <Button
//               variant="link"
//               className="text-decoration-none text-lowercase fs-6"
//               onClick={openComment}
//             >
//               View all comments
//             </Button>
//           )}
//         </div>
//         {/* {showComment && (
//           <div className="mb-3">
//             <Button onClick={openComment}>close</Button>
//             <hr />
//             {complaint.comments.map((comment, index) => (
//               <React.Fragment key={index}>
//                 <p className="text-light">{comment}</p>
//                 <hr />
//               </React.Fragment>
//             ))}
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default Complaintcard;









import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../css/Complaintcard.css";

function Complaintcard({ complaint, showMyComplaints, onDelete }) {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleUpClick = () => {
    setUpCount(upCount + 1);
  };

  const handleDownClick = () => {
    setDownCount(downCount + 1);
  };

  const openComment = () => {
    setShowComment(!showComment);
    setButtonVisible(!buttonVisible);
  };

  const handleDelete = () => {
    onDelete(complaint.id);
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
          <div className="col-5 offset-4 ">
            <h5>made by {complaint.studentName}</h5>
            {showMyComplaints && (
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className="comment text-decoration-none text-lowercase">
          {buttonVisible && (
            <Button
              variant="link"
              className="text-decoration-none text-lowercase fs-6"
              onClick={openComment}
            >
              View all comments
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Complaintcard;
