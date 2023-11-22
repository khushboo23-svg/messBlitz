import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { redirect_to_dashboard, logout } from '../../redux/studentSlice';
import { get_all_complaints, get_my_complaints } from '../../redux/complaintSlice';

const StudentLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.students.token !== null);
  useSelector((state)=>{
    console.log(state);
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5500/loginStudent', {
      email,
      password,
    })
      .then((res) => {
        const token = res.data.data.token;
        // console.log("Token is : "+token);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `${token}`;
        


        // Fetch student data after successful login
        axios.get('http://localhost:5500/student/dashboard')
          .then((response) => {
            // console.log(response.data.data.complaints);
            // console.log(response.data.data.myComplaints);
            if(response.data.status===200){
              const studentData = response.data.data;
              dispatch(redirect_to_dashboard({
                name : studentData.name,
                email: studentData.email,
                regNo: studentData.regNo,
                hostelName: studentData.hostelName,
                roomNo: studentData.roomNo,
                token: studentData.token 
              }));
              dispatch(get_all_complaints({
                complaints : studentData.complaints
              }))
              dispatch(get_my_complaints({
                myComplaints : studentData.myComplaints
              }))
              navigate('/dashboard')
            }else toast.error('Cant log in!');
          })
          .catch((error) => {
            console.error('Error fetching student data:', error);
            toast.error('Error fetching student data');
          });
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

  return (
    <>
      <FormContainer>
        {isAuthenticated ? (
          <form onSubmit={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="brand">
              <h3>STUDENT LOGIN</h3>
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
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        )}
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #001f3f;
  overflow-x: hidden;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: yellow;
      text-transform: uppercase;
    }
  }
  form {
    width: 37%;
    height: 65%;
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 7rem;
    input {
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
      font-size: 100%;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
      word-spacing: 2px;
    }
  }
`;

export default StudentLogin;