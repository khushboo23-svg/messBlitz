import React, { useEffect, useState } from "react";
import defaultProfilePic from "../images/user.png";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { add_complaint, get_all_complaints, get_my_complaints } from "../redux/complaintSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Complaintcard from "./Complaintcard";
import Error from "./Error";
import { redirect_to_dashboard } from "../redux/studentSlice";
import menu from "../images/menu.png"
import Footer from "./Footer";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const studentData = useSelector((state) => state.students);
  const [showMyComplaints, setShowMyComplaints] = useState(true);

  const myComplaints = useSelector((state) => state.complaints.myComplaints);
  const allComplaints = useSelector((state) => state.complaints.complaints);

  console.log(allComplaints);
  console.log(myComplaints);

  const dispatch = useDispatch();

  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [proofImage, setProofImage] = useState();
  const studentName = studentData.name;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);



  useEffect(() => {
    fetchComplaintData();
    const intervalId = setInterval(fetchComplaintData, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const fetchComplaintData = () => {
    // console.log("Trying to fetch the data");
    // console.log(localStorage.getItem('token'));
    const authToken = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = authToken;

    axios
      .get("http://localhost:5500/student/dashboard")
      .then((response) => {
        // console.log(response);
        
        if (response.data.status === 200) {
          const studentData = response.data.data;
          // console.log(studentData.name,studentData.email,studentData.regNo,studentData.hostelName);
          
          dispatch(
            redirect_to_dashboard({
              name : studentData.name,
              email: studentData.email,
              regNo: studentData.regNo,
              hostelName: studentData.hostelName,
              roomNo: studentData.roomNo,
              token: localStorage.getItem('token')
            })
          )
          dispatch(
            get_all_complaints({
              complaints: studentData.complaints,
            })
          );
          dispatch(
            get_my_complaints({
              myComplaints: studentData.myComplaints,
            })
          );
        } else {
          toast.error("Cant log in!");
          console.log("Error occured on refreshing");
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        toast.error("Error fetching student data");
      });
  };


  const handleComplaint = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5500/student/addComplaint", {
        title,
        description,
        proofImage,
        studentName,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(add_complaint(res.data.data));
        toast.success("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#001F3F",
    color: "white",
  };

  const heading = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    // border: "2px solid rgba(255, 255, 255, 0.3)",
  };

  const profilePicStyle = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const inputStyle = {
    border: "none",
    borderBottom: "2px solid #001F3F",
    backgroundColor: "transparent",
    color: "black",
    outline: "none",
    width: "100%",
    marginBottom: "10px",
    paddingTop: "5px",
  };

  useSelector((state)=>{
    // console.log(state);
  })
  const isAuthenticatedStudent = useSelector(
    (state) => state.students.token!==null
  );

  const authToken = localStorage.getItem('token');
  // console.log("Localstorage : "+authToken);
  // console.log("store : "+isAuthenticatedStudent);

    
    if(localStorage.getItem('token')!==null && isAuthenticatedStudent)
    return (
      <div style={pageStyle}>
        <div className="container mt-3 shadow-lg" style={heading}>
          <div className="row">
            <div className="col-md-6">
              <span style={{ fontSize: "30px" }}>
                Hostel Name : {studentData.hostelName}{" "}
                <p style={{ fontSize: "20px" }}>
                  Room No: {studentData.roomNo}
                </p>
              </span>
            </div>
            <div className="col-md-5" align="right">
              <p>Registration Number: {studentData.regNo}</p>
              <p>Name: {studentData.name}</p>
            </div>
            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <img
                src={defaultProfilePic}
                alt="Profile"
                style={profilePicStyle}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
              <button
                className="btn btn-primary m-1 shadow-lg"
                onClick={() => setShowMyComplaints(false)}
              >
                All Complaints
              </button>
              <button
                className="btn btn-primary m-1 shadow-lg"
                onClick={() => setShowMyComplaints(true)}
              >
                My Complaints
              </button>
              <button
                className="btn btn-primary m-1 shadow-lg"
                onClick={openMenu}
              >
                View Mess Menu
              </button>
              <button
                className="btn btn-primary m-1 shadow-lg"
                style={{ bottom: "180px", right: "20px" }}
                onClick={openModal}
              >
                Add Complaint
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <div className="row">
            <h2 className="text-center" style={{ color: "skyblue" }}>
              {showMyComplaints ? "My Complaints" : "All Complaints"}
            </h2>

            {showMyComplaints
              ? myComplaints.myComplaints &&
                myComplaints.myComplaints.length > 0
                ? myComplaints.myComplaints.map((complaint, index) => (
                    <div key={index} className="col-md-6">
                      <Complaintcard
                        complaint={complaint}
                        showMyComplaints={showMyComplaints}
                        // onDelete={handleDelete(complaint.id)}
                      />
                    </div>
                  ))
                : <p className='text-warning text-center'>You have made no complaints yet</p>
              : allComplaints.complaints &&
                allComplaints.complaints.length > 0
              ? allComplaints.complaints.map((complaint, index) => (
                  <div key={index} className="col-md-6">
                    <Complaintcard
                      complaint={complaint}
                      showMyComplaints={showMyComplaints}
                    />
                  </div>
                ))
              : <p className='text-warning text-center'>No complaints available</p>}
          </div>
        </div>

        <div className="flex-grow-1"></div>

        
        <Modal show={showModal} onHide={closeModal}>
  <form onSubmit={handleComplaint}>
    <Modal.Header closeButton style={{ backgroundColor: '#3498db', color: 'white' }}>
      <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Add new complaint</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <label style={{ display: 'block', marginBottom: '10px' }}>Title:</label>
      <input
        type="text"
        placeholder="Title"
        style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
        required
        onChange={(e) => settitle(e.target.value)}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>Description:</label>
      <textarea
        type="text"
        placeholder="Description"
        style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
        required
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="imageUpload" style={{ display: 'block', marginBottom: '10px' }}>Upload image if any:</label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        style={{ marginBottom: '15px' }}
        onChange={(e) => setProofImage(e.target.files[0])}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" type="submit" onClick={closeModal} style={{ borderRadius: '5px' }}>
        Submit
      </Button>
    </Modal.Footer>
  </form>
</Modal>



        <Modal show={showMenu} onHide={closeMenu} size="lg" >
  <Modal.Header closeButton style={{ backgroundColor: '#3498db', color: 'white' }}>
    <Modal.Title className="text-center" style={{ fontSize: '20px' }}>Mess Menu</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p style={{ marginBottom: '15px', fontSize: '16px' }}>Mess Menu for {studentData.hostelName} Hostel</p>
    <img src={menu} alt="Hostel Image" style={{ width: '100%', height: 'auto', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
  </Modal.Body>
  <Modal.Footer>
    
  </Modal.Footer>
</Modal>
<Footer/>

      </div>
    );
    return <Error/>
};

export default Dashboard;







