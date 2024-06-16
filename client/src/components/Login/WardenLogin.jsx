import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { redirect_to_dashboard, logoutWarden } from "../../redux/wardenSlice";
import Footer from "../Footer";

function WardenLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.wardens.token !== null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/warden/login`, {
      email,
      password,
    })
      .then((res) => {
        if(res.data.status === 200){
          const token = res.data.data.token;
          const name = res.data.data.warden.name;
          const hostel = res.data.data.warden.hostelName;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['authorization'] = `${token}`;
          dispatch(redirect_to_dashboard({
            email: email,
            token: token,
            name: name,
            hostel: hostel,
          }));
          navigate("/warden");
        } else {
          toast.error('Login failed. Wrong credentials!');
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message === 'password mismatch') {
          toast.error('Password mismatch. Please check your credentials and try again.');
        } else {
          toast.error('Login failed. Wrong credentials!');
        }
      });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutWarden());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <PageContainer>
      <FormContainer>
        <form onSubmit={handleLogin}>
          <div className="brand">
            <h3 style={{ color: "skyblue" }}>WARDEN LOGIN</h3>
          </div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </FormContainer>
      <ToastContainer />
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #001F3F;
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  form {
    width: 45%;
    height: 100%;
    margin-top: 4rem;
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 7rem;
    padding-bottom: 5rem;

    input,
    button {
      width: 100%;
      margin-bottom: 1rem;
      padding: 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: transparent;
      color: white;
      font-size: 16px;
    }

    input {
      border: 0.1rem solid skyblue;
    }

    button {
      background-color: #997af0;
      cursor: pointer;
      font-weight: bold;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: green;
    }
  }

  @media (max-width: 768px) {
    form {
      width: 70%;
    }
  }

  @media (max-width: 480px) {
    form {
      width: 90%;
    }
  }
`;

export default WardenLogin;
