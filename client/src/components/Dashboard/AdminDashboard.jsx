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
import { create_warden } from "../../redux/wardenSlice";
import { get_all_complaints } from "../../redux/complaintSlice";
import { get_hostels_data } from "../../redux/hostelSlice";


const AdminDashboard = () => {
  const [showWardenPopup, setshowWardenPopup] = useState(false);
  const [showHostelPopup, setshowHostelPopup] = useState(false);
  const [HostelList, setHostelList] = useState(true);
  const [unassignedWardensClicked, setUnassignedWardensClicked] = useState(false);
  const [hostelsClicked, setHostelsClicked] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const studentData = useSelector((state) => state.students);
  // console.log(studentData);

  const allHostelData = useSelector((state)=> state.hostels.hostels);
  console.log(allHostelData);

  const [wardenName, setWardenName] = useState();
  const [wardenEmail, setWardenEmail] = useState();
  const [wardenRecoveryEmail, setWardenRecoveryEmail] = useState();

  const [hostelWardenEmail, setHostelWardenEmail] = useState();
  const [hostelName, setHostelName] = useState();

  const chiefWardenData = useSelector((state) => state.chiefwardens);
  const chiefWardenEmail = chiefWardenData.email;
  const chiefWardenPassword = chiefWardenData.password;
  const [complaintsPopUp,setcomplaintsPopUp] = useState(false);





  const [showComplaintsModal, setShowComplaintsModal] = useState(false);

  const complaintsDisplayFunc = () => {
    setShowComplaintsModal(true);
    // Additional logic for fetching and displaying complaints can be added here
  };

  const closeModal = () => {
    setShowComplaintsModal(false);
  };





  const complaints = useSelector((state)=> 
    state.complaints
  )
  console.log(complaints);

  const openUnassignedWardens = () => {
    setUnassignedWardensClicked(true);
    setHostelsClicked(false);
  };

  const openHostels = () => {
    setHostelsClicked(true);
    setUnassignedWardensClicked(false);
  };

  

  const toggleComplaintsVisibility = (hostelName) => {
    setSelectedHostel(selectedHostel === hostelName ? null : hostelName);
  };

  const ComplaintCard = ({ complaintText }) => (
    <div className="card">
      <div className="card-body">
        {complaintText}
      </div>
    </div>
  );

  const registerWarden = (e) => {
    e.preventDefault();
    setshowWardenPopup(false);
    axios.post("http://localhost:5500/chiefWarden/registerWarden", {
      name: wardenName,
      email: wardenEmail,
      recoveryEmail: wardenRecoveryEmail,
    }).then((res) => {
      console.log(res);
      
      if(res.data.data.status !== 200){
        console.log(res);
        console.log("warden registered successfully");
        dispatch(create_warden({
        name: wardenName,
        email: wardenEmail,
        recoveryEmail: wardenRecoveryEmail,
      }));
      }else console.log("Cant register");
    }).catch((err) => {
      console.log("cant register the warden");
    });
  };

  const registerHostel = (e) => {
    e.preventDefault();
    setshowHostelPopup(false);
    axios.post("http://localhost:5500/chiefWarden/registerHostel", {
      hostelName,
      warden: hostelWardenEmail,
      messMenu: "demo",
    }).then((res) => {
      console.log("hostel registered successfully");
    }).catch((err) => {
      console.log("cant register the hostel");
    });
  };

  const heading = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
  };

  const profilePicStyle = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const HostelRow = ({ allHostelData, wardenName }) => (
    <>
      <div className="hostel-row row my-3 ">
        <div className="hostel-name col-5">{allHostelData}</div>
        <div className="warden-name col-5">{wardenName}</div>
        <button className="btn btn-success col-2 " onClick={() => toggleComplaintsVisibility(hostelName)}>
          View Complaints
        </button>
      </div>
      <hr />
      {selectedHostel === hostelName && (
        <div className="mt-3">
          <ComplaintCard complaintText="Dummy Complaint 1" />
          <ComplaintCard complaintText="Dummy Complaint 2" />
          {/* Add more ComplaintCard components as needed */}
        </div>
      )}
    </>
  );


  
  

  // const hostelsData = [
  //   { hostelName: "Hostel A", wardenName: "Warden 1" },
  //   { hostelName: "Hostel B", wardenName: "Warden 2" },
  //   { hostelName: "Hostel C", wardenName: "Warden 3" },
  // ];

  const [title, settitle] = useState("");
  const studentName = studentData.name;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useDispatch();

  // const handleComplaint = (e) => {
  //   e.preventDefault();
  //   axios.post("http://localhost:5500/student/addComplaint", {
  //     title,
  //     studentName,
  //   }).then((res) => {
  //     dispatch(add_complaint(res.data));
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // };

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

  useSelector((state) => {
    console.log(state);
  });

  const authToken = localStorage.getItem('token');
  const isAuthenticatedChiefWarden = useSelector(
    (state) => state.chiefwardens.token !== null
  );

  if (localStorage.getItem('token') !== null && isAuthenticatedChiefWarden) {
    return (
      <div style={pageStyle}>
        <div className="container mt-5" style={heading}>
          <div className="row">
            <div className="col-md-6">
              <span style={{ fontSize: '20px' }}>Chief Warden Email : {chiefWardenData.email} </span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
              <button id="hostelButton" className="btn btn-primary m-1" onClick={openHostels}>
                Hostels
              </button>
              <button className="btn btn-primary m-1" onClick={openWardenPopup}>
                Add Warden
              </button>
              <button className="btn btn-primary m-1" onClick={openHostelPopup}>
                Add Hostel
              </button>
              <button className="btn btn-primary m-1" onClick={openUnassignedWardens}>
                Unassigned Wardens
              </button>
            </div>
          </div>
        </div>

        {unassignedWardensClicked && (
          <div className="container mt-3">
            <p>Text or content for Unassigned Wardens goes here.</p>
          </div>
        )}

        {hostelsClicked && (
          <div className="container mt-5">
            {allHostelData.data.map((hostel, index) => (
              <HostelRow
                key={index}
                hostelName={hostel.hostelName}
                wardenName={hostel.name}
              />
            ))}
          </div>
        )}

        <div className="flex-grow-1"></div>

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

        <Modal show={showHostelPopup} onHide={closeHostelPopup}>
          <form onSubmit={registerHostel}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Hostel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="email"
                placeholder="Warden-Email"
                style={inputStyle}
                required
                onChange={(e) => setHostelWardenEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Hostel-Name"
                style={inputStyle}
                required
                onChange={(e) => setHostelName(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={closeHostelPopup}>
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>


        {/* <Modal show={showHostPopup} onHide={closeHostelPopup}>
          <form onSubmit={registerHostel}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Hostel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="email"
                placeholder="Warden-Email"
                style={inputStyle}
                required
                onChange={(e) => setHostelWardenEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Hostel-Name"
                style={inputStyle}
                required
                onChange={(e) => setHostelName(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={closeHostelPopup}>
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal> */}

        <div className="container m-5">
          <div className="row d-flex justify-content-center align-items-center">
              {allHostelData.data.map((hostel, index) => (
                <div key={index} className="col-md-4 text-center justify-content-center align-items-center border border-primary m-1 p-5">
                    <p>{hostel.hostelName}</p>
                    <br />
                    <p>{hostel.name}</p>
                    <br />
                    <button className="btn btn-success">
                      view Complaints
                    </button>
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return <Error />;
};

export default AdminDashboard;
