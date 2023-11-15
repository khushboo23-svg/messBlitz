// import React, { useState } from 'react';
// // import Navbar from './Navbar';
// import defaultProfilePic from '../images/user.png';
// // import Footer from './Footer';
// import { Button, Modal } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

// const Dashboard = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const studentData = useSelector((state) => state.students);

//   console.log(studentData);


//   const pageStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     backgroundColor: '#001F3F',
//     color: 'white',
//   };

//   const heading = {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: '20px',
//     borderRadius: '10px',
//     border: '2px solid rgba(255, 255, 255, 0.3)',
//   };

//   const profilePicStyle = {
//     width: '70px',
//     height: '70px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//   };

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   const openMenu = () => setShowMenu(true);
//   const closeMenu = () => setShowMenu(false);

//   const inputStyle = {
//     border: 'none',
//     borderBottom: '2px solid #001F3F',
//     backgroundColor: 'transparent',
//     color: 'black',
//     outline: 'none',
//     width: '100%',
//     marginBottom: '10px',
//     paddingTop: '5px',
//   };

//   return (
//     <div style={pageStyle}>
//       {/* <Navbar /> */}
//       <div className="container mt-5" style={heading}>
//         <div className="row">
//           <div className="col-md-6">
//             <span style={{ fontSize: '30px' }}>{studentData.hostelName} <p style={{fontSize: '20px'}}>Room No: {studentData.roomNo}</p></span> 
            
//           </div>
//           <div className="col-md-5" align="right">
//             <p>Registration Number: {studentData.regNo}</p>
//             <p>Name: {studentData.name}</p>
//           </div>
//           <div className="col-md-1 d-flex justify-content-center align-items-center">
//             <img src={defaultProfilePic} alt="Profile" style={profilePicStyle} />
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row justify-content-left">
//             <div className="col-md-6 p-2 m-2">
//                 <button className='btn btn-primary m-1'>My Complaints</button>
//                 <button className='btn btn-primary m-1'>All Complaints</button>
//                 <button className='btn btn-primary m-1' onClick={openMenu}>View Mess Menu</button>
//                 <button className="btn btn-primary m-1" style={{ bottom: '180px', right: '20px' }} onClick={openModal}>
//                 Add complaint
//                 </button>
                
//             </div>
//         </div>
//       </div>

      
      

//       <div className="flex-grow-1"></div>

      

//       {/* <Footer /> */}

//       <Modal show={showModal} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add new complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input type="text" placeholder="title" style={inputStyle} required/>
//           <textarea type="text" placeholder="Description" style={inputStyle} required/>
//           <label htmlFor="">Upload image if any</label> <br /> <br />
//           <input type="file" accept="image/*" />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="dark" onClick={closeModal}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>


//       <Modal show={showMenu} onHide={closeMenu}>
//         <Modal.Header closeButton>
//           <Modal.Title className='text-center'>Mess Menu</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Image uploaded for the mess menu will be displayed here </p>
//         </Modal.Body>
//         <Modal.Footer>
//         </Modal.Footer>
//       </Modal>

      
//     </div>
//   );
// };

// export default Dashboard;











//adding the complaint feature
import React, { useState } from 'react';
// import Navbar from './Navbar';
import defaultProfilePic from '../images/user.png';
// import Footer from './Footer';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { add_complaint } from '../redux/complaintSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const studentData = useSelector((state) => state.students);


  const [title,settitle] = useState('');
  const [description,setDescription] = useState('');
  const [proofImage,setProofImage] = useState();
  const studentName = studentData.name;

  const dispatch = useDispatch();

  console.log(studentData);

  const handleComplaint = (e)=> {
    e.preventDefault();
    axios.post('http://localhost:5500/student/addComplaint',{
      title,
      description,
      proofImage,
      studentName,
      
    }).then((res)=>{
      console.log(res);
      // toast.success('complaint added successfully')
      dispatch(add_complaint(res.data));
      
      // console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }


  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#001F3F',
    color: 'white',
  };

  const heading = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  };

  const profilePicStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const inputStyle = {
    border: 'none',
    borderBottom: '2px solid #001F3F',
    backgroundColor: 'transparent',
    color: 'black',
    outline: 'none',
    width: '100%',
    marginBottom: '10px',
    paddingTop: '5px',
  };

  return (
    <div style={pageStyle}>
      {/* <Navbar /> */}
      <div className="container mt-5" style={heading}>
        <div className="row">
          <div className="col-md-6">
            <span style={{ fontSize: '30px' }}>Hostel Name : {studentData.hostelName} <p style={{fontSize: '20px'}}>Room No: {studentData.roomNo}</p></span> 
            
          </div>
          <div className="col-md-5" align="right">
            <p>Registration Number: {studentData.regNo}</p>
            <p>Name: {studentData.name}</p>
          </div>
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <img src={defaultProfilePic} alt="Profile" style={profilePicStyle} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
                <button className='btn btn-primary m-1'>My Complaints</button>
                <button className='btn btn-primary m-1'>All Complaints</button>
                <button className='btn btn-primary m-1' onClick={openMenu}>View Mess Menu</button>
                <button className="btn btn-primary m-1" style={{ bottom: '180px', right: '20px' }} onClick={openModal}>
                Add complaint
                </button>
                
            </div>
        </div>
      </div>

      
      

      <div className="flex-grow-1"></div>

      

      {/* <Footer /> */}

      <Modal show={showModal} onHide={closeModal}>
        <form onSubmit={handleComplaint}>
          <Modal.Header closeButton>
            <Modal.Title>Add new complaint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" placeholder="title" style={inputStyle} required onChange={(e) => settitle(e.target.value)} />
            <textarea type="text" placeholder="Description" style={inputStyle} required onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor="">Upload image if any</label> <br /> <br />
            <input type="file" accept="image/*" onChange={(e) => setProofImage(e.target.files[0])} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={closeModal}>
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>



      <Modal show={showMenu} onHide={closeMenu}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Image uploaded for the mess menu will be displayed here </p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      
    </div>
  );
};

export default Dashboard;



