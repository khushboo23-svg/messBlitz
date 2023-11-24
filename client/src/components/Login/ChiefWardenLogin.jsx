import React, { useState, useEffect }from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { redirect_to_dashboard,logout, get_chiefWarden_data } from "../../redux/chiefWardenSlice";
import Error from "../Error";
import Footer from "../Footer";
import { get_hostels_data } from "../../redux/hostelSlice";


function ChiefWardenLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.chiefwardens.token !== null);
  

  // useSelector((state)=>{
  //   console.log(state);
  // })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5500/loginChiefWarden', {
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        const token = res.data.data.token;
        console.log("Token is : "+token);
        localStorage.setItem('token', token);
        console.log(res.data);
        axios.defaults.headers.common['Authorization'] = `${token}`;


        axios.get("http://localhost:5500/chiefWarden/dashboard")
        .then((response)=> {
          console.log(response.data);
          if(response.data.status===200){
            console.log(response);
            dispatch(redirect_to_dashboard({
              email : email,
              password : password,
              token : token,
            })); 
            dispatch(get_hostels_data(response.data));
            dispatch(get_chiefWarden_data({email : email,password : password}));
            navigate("/admindashboard");
          }else console.log("Error fetching chiefwarden dashboard data");
          
        })
        .catch((error)=> {
          console.log(error);
        })
        
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.message === 'password mismatch'
        ) {
          toast.error('Password mismatch. Please check your credentials and try again.');
        } else {
          toast.error('Login failed. Wrong credentials!');
        }
      });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const isAuthenticatedChiefWarden = useSelector((state)=> 
    state.chiefwardens.token!==null
  );
  const authToken = localStorage.getItem('token');

  
  return (
    <>
         <FormContainer>
          <form onSubmit={handleLogin}>
            <div className="brand">
              <h3 style={{color : "skyblue"}}>CHIEF WARDEN LOGIN</h3>
            </div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
      </FormContainer>
      <Footer/>
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
      border: 0.1rem solid skyblue;
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


export default ChiefWardenLogin;
 