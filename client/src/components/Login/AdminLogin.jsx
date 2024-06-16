import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WardenLogin from "./WardenLogin";
import ChiefWardenLogin from "./ChiefWardenLogin";
import AccountantLogin from "./AccountantLogin";

function AdminLogin() {
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });

  const [selectedTab, setSelectedTab] = useState("Warden");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation();
  };

  const handleValidation = () => {
    const { password } = values;

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters.", toastOptions);
      return false;
    }
    return true;
  };

  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case "Warden":
        return <WardenLogin values={values} handlechange={handlechange} handleSubmit={handleSubmit} />;
      // case "ChiefWarden":
      //   return <ChiefWardenLogin values={values} handlechange={handlechange} handleSubmit={handleSubmit} />;
      // case "Accountant":
      //   return <AccountantLogin values={values} handlechange={handlechange} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <TabsContainer> */}
        {/* <Tab onClick={() => setSelectedTab("Warden")}>Warden Login</Tab> */}
        {/* <Tab onClick={() => setSelectedTab("ChiefWarden")}>Chief Warden Login</Tab>
        <Tab onClick={() => setSelectedTab("Accountant")}>Accountant Login</Tab> */}
      {/* </TabsContainer> */}

      {renderSelectedTab()}

      <ToastContainer />
    </>
  );
}

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #004080;
  padding: 1rem;
  font-weight: bold;
`;

const Tab = styled.div`
  cursor: pointer;
  color: #fff;
  background-color: rgba(0, 31, 63, 0.7);
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004080;
    color : black;
  }
`;

export default AdminLogin;



