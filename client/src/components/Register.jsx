import React, { useState, useEffect }from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {

  const [values, setValues] = useState({
    name: "",
    regNo:"",
    email: "",
    hostelname:"",
    roomNo:"",
    password: "",
    confirmpassword: "",
  });

  const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert("form");
    handleValidation();
  };

  const handleValidation = () => {
    const { password, confirmpassword,email, name } = values;
    if (password != confirmpassword) {
      // alert("wnetskjg");
      toast.error("password and confirm passward should be same .",toastOptions);
        return false;
      // toast.error("password and confirm passward should be same .",{
      //   position: "bottom-right",
      //   autoClose: 8000,
      //   pauseOnHover: true,
      //   draggable: true,
      //   theme: "dark"
      // });
    }

    else if(name.length < 3)
    {
      toast.error("name should be greater then 3 characters.",toastOptions);
      return false;
    }
    else if(password.length < 8)
    {
      toast.error("password should be at least 8 character.",toastOptions);
      return false;
    } else if(email === "")
    {
      toast.error("email is required.",toastOptions);
      return false;
    }
    return true;
  };


//   const [roomNo, setRoomNo] = useState('');
  const handlechange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
    // const value = event.target.value;
    // if (!isNaN(value) && parseFloat(value) >= 0) {
    //     setRoomNo(value);
    //   }
  };

  return (
    <>
      <FormContainer >
        <form onSubmit={(event) => handleSubmit(event)} >
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h3>STUDENT REGISTER</h3>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handlechange(e)}
          />
          <input 
            type="text"
            placeholder="Registation Number"
            name="regNo"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="text"
            placeholder="Hostel Name"
            name="hostelname"
            onChange={(e) => handlechange(e)}
          />
          {/* <input
                list="hostelnameList"
                type="text"
                placeholder="hostelname name"
                name="hostelname"
                // value={hostelname}
                onChange={handlechange}
          />
            <datalist id="hostelnameList">
                <option value="hostelname A" />
                <option value="hostelname B" />
                <option value="hostelname C" />
                {/* Add more options as needed */}
            {/* </datalist> */}
          <input
            type="Number"
            placeholder="Room Number"
            name="roomNo"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(e) => handlechange(e)}
          />
          <button type="">Create User</button>
          <span>
            Don't have an account? <Link to="/Student">Login</Link>
          </span>
        </form>
        <div>
        </div>
      </FormContainer>  
      
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 110%;
  width: 100%;
  display: flex;
  flex-direction: column;
//   justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #001F3F;
  overflow: hidden;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3{
      color: yellow;
      text-transform: uppercase;
    }
  }
  form{
    width: 45%;
    height:100%;
    margin-top: 4rem;
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 7rem;
    padding-bottom: 5rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid yellow;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
      font-size: 90%;
      &:focus {
        border: 0.1rem solid blue;
        outline: none;
      }      
      
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 0.3rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1.7rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: green;
      }
    }
    span {
      color: white;
      font-size: 100%;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
      word-spacing: 2px;
    }
  }
`;

export default Register;
