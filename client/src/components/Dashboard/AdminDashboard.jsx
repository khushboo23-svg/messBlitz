
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add_complaint } from "../../redux/complaintSlice";
import axios from "axios";
import Error from "../Error";
import Footer from "../Footer";
import defaultProfilePic from "../../images/user.png";
import chiefWardenSlice from "../../redux/chiefWardenSlice";
import { toast } from "react-toastify";



const AdminDashboard = () => {
  const [showWardenPopup, setshowWardenPopup] = useState(false); 
  const [showHostelPopup, setshowHostelPopup] = useState(false); 
  const studentData = useSelector((state) => state.students);
  const [HostelList, setHostelList] = useState(true);


  const [wardenName,setWardenName] = useState();
  const [wardenEmail,setWardenEmail] = useState();
  const [wardenRecoveryEmail,setWardenRecoveryEmail] = useState();

  const chiefWardenData = useSelector((state)=> 
    state.chiefwardens
  )
  const chiefWardenEmail = chiefWardenData.email;
  const chiefWardenPassword = chiefWardenData.password;
  // console.log(chiefWardenData);

  const registerWarden = () => {
    axios.post("http://localhost:5500/chiefWarden/registerWarden",{
      wardenName,
      wardenEmail,
      wardenRecoveryEmail,
    }).then((res)=> { 
      console.log("registered successfully");
    }).catch((err)=>{
      console.log("cant register the warden");
    })
  }

  

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


  // function for hostels list---------------------
  const HostelRow = ({ hostelName, wardenName }) => (
    <>
    <div className="hostel-row row my-3 ">
      <div className="hostel-name col-5">{hostelName}</div>
      <div className="warden-name col-5">{wardenName}</div>
      <button className="btn btn-success col-2 " >View Complaints</button>
    </div>
    <hr />
    </>
  );

  const hostelsData = [
    { hostelName: "Hostel A", wardenName: "Warden 1" },
    { hostelName: "Hostel B", wardenName: "Warden 2" },
    { hostelName: "Hostel C", wardenName: "Warden 3" },
  ];

// ------------------------------
  const [title, settitle] = useState("");
  const studentName = studentData.name;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useDispatch();

  // console.log(studentData);

  const handleComplaint = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5500/student/addComplaint", {
        title,
        studentName,
      })
      .then((res) => {
        console.log(res);
        // toast.success('complaint added successfully')
        dispatch(add_complaint(res.data));

        // console.log(res);
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

  const openWardenPopup = () => setshowWardenPopup(true);
  const closeWardenPopup = () => setshowWardenPopup(false);

  const openHostelPopup = () => setshowHostelPopup(true);
  const closeHostelPopup = () => setshowHostelPopup(false);

  const openHostelList = () => {
    setHostelList(!HostelList);
    
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
    console.log(state);
  })
  const authToken = localStorage.getItem('token');
  const isAuthenticatedChiefWarden = useSelector(
    (state) => state.chiefwardens.token!==null
  );

  
  
  if(localStorage.getItem('token')!==null && isAuthenticatedChiefWarden)
  return (
    <div style={pageStyle}>
      <div className="container mt-5" style={heading}>
        <div className="row">
          <div className="col-md-6">
            <span style={{ fontSize: '20px' }}>Chief Warden Email : {chiefWardenData.email} </span> 
            
          </div>
          {/* <div className="col-md-5" align="right">
            <p>Registration Number: {studentData.regNo}</p>
            <p>Name: {studentData.name}</p>
          </div>
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <img src={defaultProfilePic} alt="Profile" style={profilePicStyle} />
          </div> */}
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-left">
          <div className="col-md-6 p-2 m-2">
            <button id="hostelButton" className="btn btn-primary m-1 " onClick={toggleVisibility}>
              Hostels
            </button>
            <button className="btn btn-primary m-1" onClick={openWardenPopup}>
              Add Warden
            </button>
            <button className="btn btn-primary m-1" onClick={openHostelPopup}>
              Add Hostel
            </button>
            {/* <button className="btn btn-primary m-1" style={{ bottom: '180px', right: '20px' }} onClick={openWardenPopup}>
                Add complaint
                </button>
                 */}
          </div>
        </div>
      </div>
      {/* <hr style={{ width: "90%", marginLeft: "5%" }} /> */}

      
        <div className="container mt-5">
          {hostelsData.map((hostel, index) => (
            <HostelRow
              key={index}
              hostelName={hostel.hostelName}
              wardenName={hostel.wardenName}
            />
          ))}
        </div>
      

      <div className="flex-grow-1"></div>

      {/* <Footer /> */}

      <Modal show={showWardenPopup} onHide={closeWardenPopup}>
        <form onSubmit={registerWarden}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Warden</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              required
              onChange={(e) => setWardenEmail(e.target.value)}
            />
            <input
              type="email"
              placeholder="Recovery-Email"
              style={inputStyle}
              required
              onChange={(e) => setWardenRecoveryEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              required
              onChange={(e) => setWardenName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={registerWarden}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* ------------------------------------------------- */}
      <Modal show={showHostelPopup} onHide={closeHostelPopup}>
        <form onSubmit={handleComplaint}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Hostel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="email"
              placeholder="Warden-Email"
              style={inputStyle}
              required
              onChange={(e) => settitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Hostel-Name"
              style={inputStyle}
              required
              onChange={(e) => settitle(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={closeHostelPopup}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Footer/>
    </div>
  );
  return <Error/>
};

export default AdminDashboard;
