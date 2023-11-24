import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import axios from "axios";
import Error from "../Error";
import Footer from "../Footer";
import defaultProfilePic from "../../images/user.png";

import { toast } from "react-toastify";
import { create_warden } from "../../redux/wardenSlice";

import { get_unassigned_wardens } from "../../redux/wardenSlice";
import { get_hostels_data } from "../../redux/hostelSlice";



const AdminDashboard = () => {
  const [showWardenPopup, setshowWardenPopup] = useState(false);
  const [showHostelPopup, setshowHostelPopup] = useState(false);
  const [HostelList, setHostelList] = useState(true);
  const [unassignedWardensClicked, setUnassignedWardensClicked] = useState(false);
  const [hostelsClicked, setHostelsClicked] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const studentData = useSelector((state) => state);
  console.log(studentData);

  const allHostelData = useSelector((state)=> state.hostels.hostels);
  // console.log(allHostelData);

  const [wardenName, setWardenName] = useState();
  const [wardenEmail, setWardenEmail] = useState('');
  const [wardenRecoveryEmail, setWardenRecoveryEmail] = useState();

  const [hostelWardenEmail, setHostelWardenEmail] = useState();
  const [hostelName, setHostelName] = useState();

  const chiefWardenData = useSelector((state) => state.chiefwardens);
  const chiefWardenEmail = chiefWardenData.email;
  const chiefWardenPassword = chiefWardenData.password;
  const [complaintsPopUp,setcomplaintsPopUp] = useState(false);





  const [wardenOptions, setWardonOptions] = useState([]);





  const [showComplaintsModal, setShowComplaintsModal] = useState(false);

  const complaintsDisplayFunc = () => {
    setShowComplaintsModal(true);
    // Additional logic for fetching and displaying complaints can be added here
    
  };

  const closeModal = () => {
    setShowComplaintsModal(false);
  };


  const getComplaintByHostelName  = () => {
    axios.post("http://localhost:5500/chiefWarden/getComplaints",{hostelName : "KNGH"})
    .then((res)=>{
      console.log(res);
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  console.log(localStorage.getItem('token'));








  // useEffect(() => {
  //   fetchUnassignedWarden();
  //   const intervalId = setInterval(fetchUnassignedWarden, 1000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);


  useEffect(() => {
    // Fetch hostel options from the API
    axios.get('localhost:5500/warden/dashboard')
      .then(response => {
        console.log(response.data);
        // setWardonOptions(response.data.wardens);
      })
      .catch(error => {
        console.error('Error fetching hostel options:', error);
        toast.error("Error fetching hostel options");
      });
  }, []);
  const handleWardenChange = (e) => {
    setHostelWardenEmail(e.target.value);
  };


  console.log(wardenOptions);
  // console.log(wardenOptions.wardens.map(item => item.email));






















  
 




  

  


 

  


  const complaints = useSelector((state)=> 
    state.complaints
  )
  console.log(complaints);

  // const openUnassignedWardens = () => {
  //   setUnassignedWardensClicked(true);
  //   setHostelsClicked(false);
  // };

  const openHostels = () => {
    setHostelsClicked(true);
    setUnassignedWardensClicked(false);
  };

  

  // const toggleComplaintsVisibility = (hostelName) => {
  //   setSelectedHostel(selectedHostel === hostelName ? null : hostelName);
  // };

  // const ComplaintCard = ({ complaintText }) => (
  //   <div className="card">
  //     <div className="card-body">
  //       {complaintText}
  //     </div>
  //   </div>
  // );

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
      warden: wardenEmail,
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

  
  
  

  
  // const [title, settitle] = useState("");
  // const studentName = studentData.name;
  const [isVisible, setIsVisible] = useState(false);
  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };

  const dispatch = useDispatch();

  

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
            </div>
          </div>
        </div>

        {unassignedWardensClicked && (
          <div className="container mt-3">
            <p>Text or content for Unassigned Wardens goes here.</p>
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
              {/* <input
                type="email"
                placeholder="Warden-Email"
                style={inputStyle}
                required
                onChange={(e) => setHostelWardenEmail(e.target.value)}
              /> */}

              


              {/* {wardenOptions.wardens.length >= 1 && (
  <select
    value={wardenEmail}
    onChange={handleWardenChange}
  >
    <option value="" disabled className="text-dark">
      Select Available Warden
    </option>
    {wardenOptions.wardens.map((item) => (
      <option key={item._id} value={item.email} className="text-dark">
        {item.email}
      </option>
    ))}
  </select>
)} */}



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
        <Footer />
      </div>
    );
  }
  return <Error />;
};

export default AdminDashboard;