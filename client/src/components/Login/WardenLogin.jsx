import React, { useState, useEffect }from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WardenLogin() {
    
    const [values, setValues] = useState({
        userId: "",
        password: "",
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
        handleValidation();
      };
    
      const handleValidation = () => {
        const { password} = values;
    
        if(password.length < 8)
        {
          toast.error("password should be at least 8 character.",toastOptions);
          return false;
        } 
        return true;
      };    

      const handlechange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log(values);
      };

  return (
    <>
        <FormContainer >
        <form onSubmit={(event) => handleSubmit(event)} >
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h3>Warden LOGIN</h3>
          </div>
          <input
            type="text"
            placeholder="User Id/Email"
            name="userId"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handlechange(e)}
          />
          <button type="">Login</button>
        </form>
        <div>
        </div>
      </FormContainer>  
      
      <ToastContainer />
    </>
  )
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
//   justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #001F3F;
//   131324  #001F3F
  overflow-x: hidden;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
      height: 5rem;
    }
    h3{
      color: yellow;
      text-transform: uppercase;
    }
  }
  form{
    width:37%;
    height:65%;
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 7rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid yellow;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
      font-size: 100%;
      &:focus {
        border: 0.1rem solid blue;
        outline: none;
      }      
      
    }
    button {
      background-color: #997af0;
      color: white;
      margin-top: 1rem;
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
      font-size: 150%;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
      word-spacing: 0.4rem;
    }
  }
`;


export default WardenLogin;
 