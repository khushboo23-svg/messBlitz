import React, { useEffect, useRef, useState } from 'react';
// import Navbar from './Navbar';
import defaultProfilePic from '../../images/user.png';
// import Footer from './Footer';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { add_complaint,get_all_complaints,get_my_complaints } from '../../redux/complaintSlice';
import { change_in_image_dash, menu_uploaded } from '../../redux/wardenSlice';
import axios from 'axios';
import Error from '../Error';
import Complaintcard from '../Complaintcard';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Char from '../Char';
import '../../css/dashboard.css'
import Footer from '../Footer';



const WardenDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [updateMenu, setUpdateMenu] = useState(false);
  const [messMenuImageUrl, setMessMenuImageUrl] = useState('');
  const [showFeedback,setShowFeedback] = useState(false);
  const wardenData = useSelector((state) => state.wardens);
  const [showAllComplaints, setShowAllComplaints] = useState(true);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const fileInputRef = useRef(null);

  // const myComplaints = useSelector((state) => state.complaints.myComplaints);
  const allComplaints = useSelector((state) => state.complaints.complaints);
  // console.log("allcomplaints-",allComplaints.complaints);
  // console.log(myComplaints.myComplaints);

  const authToken = localStorage.getItem('token');


  useEffect(() => {
    fetchComplaintData();
    const intervalId = setInterval(fetchComplaintData, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const fetchComplaintData = () => {
    const authToken = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = authToken;axios
    .get(`${process.env.REACT_APP_BACK_END_URL}/warden/dashboard`)
    .then((response) => {
      if(response.data.data.profileImg){
        dispatch(
          change_in_image_dash ({
            image: response.data.data.profileImg,
          })
        )
        setProfilePic(response.data.data.profileImg);
      }
      dispatch(
        get_all_complaints({
          complaints: response.data.data.complaints,
        }));
    }).catch((err)=>{
      toast.error(err);
    })
  }


  // const [complaintlist,setComplaintlist] = useState(true);

  // const openList =()=> {
  //   setComplaintlist(!complaintlist);
  // }


  const [title,settitle] = useState('');
  const [description,setDescription] = useState('');
  const [proofImage,setProofImage] = useState();
  const [file,setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const studentName = wardenData.name;
  const dispatch = useDispatch();

  // console.log(wardenData);

  //Menu updatation
  const uploadImg = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/fileUpload/`, formData)
      .then(res => {
        axios.post(`${process.env.REACT_APP_BACK_END_URL}/warden/uploadMenu`,{menu_url: res.data.data.url}).then(res2=>{
          if(res2.data.status===200){
            dispatch(menu_uploaded(res.data.data.url));
            setUpdateMenu(false);
            toast.success('Menu updated successfully');
          }
          else{
            toast.error(res2.data.message);
          }
        }).catch(err=>{
          toast.error('Menu update failed');
        });
      })
      .catch(err => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  const [feedBacks,setFeedBacks]=useState([]);
  const handleFetchFeedback = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/getFeedback`,
      fromDate,
      toDate
    ).then( res =>{
      setFeedBacks(res.data.data.feedbacks);
    })
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#001F3F',
    color: 'white',
    justifyContent:'space-between',
  };

  const profilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  };


  const openMenu = () => {
    setShowMenu(true);
    axios.get(`${process.env.REACT_APP_BACK_END_URL}/warden/messMenu`).then(res=>{
      if(res.data.status===200){
        setMessMenuImageUrl(res.data.data.messMenu);
      }
      else{
        console.log("Mess menu load error:");
        setMessMenuImageUrl('');
      }
    }).catch(err=>{
      console.log(err);
      setMessMenuImageUrl('');
    })
  };
  const closeMenu = () => setShowMenu(false);
  const openFeedback = () => setShowFeedback(true);
  const closeFeedback = () => setShowFeedback(false);
  const openUpdateMenu = () => setUpdateMenu(true);
  const closeUpdateMenu = () => setUpdateMenu(false);
  const openBill = () => setShowBill(true);
  const closeBill = () => setShowBill(false);
  const [billAmount, setBillAmount] = useState("");
  const [billFile, setBillFile] = useState();

  // Function to handle bill upload
  const uploadBill = (e) => {
    e.preventDefault();
    if (!billFile || !billAmount) {
        toast.error("Please enter all bill details.");
        return;
    }

    setIsLoading(true);
    // console.log("bill-",billFile);
    // Step 1: Upload the file first
    const formData = new FormData();
    formData.append('file', billFile);

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/fileUpload/`, formData)
        .then(res => {
          if(res.data.status===200){
            const fileUrl = res.data.data; 

            // console.log("fileurl",fileUrl.url);
            
            const billData = {
                billFile: fileUrl.url,
                billAmount: billAmount
            };

            return axios.post(`${process.env.REACT_APP_BACK_END_URL}/warden/uploadBill`, billData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
          }
          else{
            toast.error("file not uploded retry after some time")
          }

        })
        .then(response => {
            toast.success('Bill added successfully');
            setBillFile(null);
            setBillAmount("");
            setShowBill(false);
        })
        .catch(err => {
            toast.error('Error uploading bill');
        })
        .finally(() => {
            setIsLoading(false);
        });
};


  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // console.log("images-",event.target.files[0]);
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      
      axios.post(`${process.env.REACT_APP_BACK_END_URL}/fileUpload/`, formData)
      .then(res => {

        if(res.data.status==200){
          const newImage = res.data.data.url;
          // setProfilePic(newImage);
          const prof_image = { image_url: newImage };

          return axios.post(`${process.env.REACT_APP_BACK_END_URL}/warden/uploadFile`, prof_image, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('token')
              }
          });
        }
        else{
          toast.error("Failed to upload image. Please try again.");
        }
      })
      .then(res => {
        toast.success("profile image uploaded successfully");
      })
      .catch(error => {
        toast.error("Failed to upload image. Please try again.");
      });

    }
    else{
      toast.error("Add file correctly");
    }
  };

  

  return (
    <div style={pageStyle}>
      <div className="container mt-5 warden-container">
          <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
          <div className="profile-pic-container" onClick={handleImageClick}>
              <img
                src={profilePic}
                alt="Profile"
                style={profilePicStyle}
              />
              <div className="overlay-update-warden">Edit</div>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
              <h3 className='ward-text'>Warden Name: {wardenData.name}</h3>
          </div>
          <div className='hostel_name'>
              <h2 className='ward-text'>Hostel Name:</h2>
              <h3 className='ward-text'>{wardenData.hostel}</h3>
          </div>
      </div>

      <div className="container">
        <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
                <button className='btn btn-primary m-1' onClick={openMenu}>View Mess Menu</button>
                <button className='btn btn-primary m-1' onClick={openUpdateMenu}>Update Mess Menu</button>
                <button className='btn btn-primary m-1' onClick={openFeedback}>Feedbacks</button>
                <button className='btn btn-primary m-1' onClick={openBill}>Bill Add</button>
            </div>
        </div>
      </div>

      <div className="container mb-5">
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <p style={{fontWeight:500,fontSize:'20px',borderBottom:'1px solid white'}}>All Complaints</p>
        </div>
        <div className="row">
          {showAllComplaints && allComplaints && allComplaints.allComplaints
            ? allComplaints.allComplaints.map((complaint, index) => (
                <div key={index} className="col-md-6">
                  <Complaintcard complaint={complaint} allComplaints={allComplaints} />
                </div>
              ))
            : allComplaints && allComplaints.complaints
            ? allComplaints.complaints.map((complaint, index) => (
                <div key={index} className="col-md-6">
                  <Complaintcard complaint={complaint} allComplaints={allComplaints} />
                </div>
              ))
            : <p>No complaints to display</p>
          }
        </div>
      </div>
      <div className="flex-grow-1"></div>

      <Modal show={showMenu} onHide={closeMenu}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title>Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
          {messMenuImageUrl ? <img src={messMenuImageUrl} alt="Mess Menu" style={{ width: '100%' }} /> : <p>No image available</p>}
        </Modal.Body>
      </Modal>

      <Modal show={updateMenu} onHide={closeUpdateMenu}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title className='text-center'>Update Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
          <label>Upload image of new mess menu</label><br /><br />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'#0a487f',color:'white'}}>
          <Button disabled={isLoading} onClick={uploadImg}>Update</Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showFeedback} onHide={closeFeedback}>
        <form onSubmit={handleFetchFeedback}>
          <Modal.Header closeButton style={{ backgroundColor: 'rgb(10, 91, 145)', color: 'white' }}>
            <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Daily Ratings:</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'#087bb3d4'}}>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'2px'}}>
              <label>From: </label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <label>To: </label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
            </div>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'2px'}}>
              <Button type="submit" className="mt-2">Show Ratings</Button>
            </div>
            <Char feedbacks={feedBacks} />
          </Modal.Body>
        </form>
      </Modal>
      
      <Modal show={showBill} onHide={closeBill}>
      <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
        <Modal.Title className='text-center'>Add Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
        <form onSubmit={uploadBill}>
          <label>Bill Amount</label><br />
          <input
            type="number"
            value={billAmount}
            onChange={e => setBillAmount(e.target.value)}
            placeholder="Enter amount"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label>Upload Bill Image</label><br />
          <input type="file" accept="image/*" onChange={e => setBillFile(e.target.files[0])} style={{marginBottom:'5px'}}/>
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Modal.Footer style={{backgroundColor:'#0a487f',color:'white'}}>
            <Button type="submit" disabled={isLoading}>Add Bill</Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
    <Footer/>
    </div>
  );
};

export default WardenDashboard;