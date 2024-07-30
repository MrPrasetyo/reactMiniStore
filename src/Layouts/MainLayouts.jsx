import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css' 
import { ToastContainer } from "react-toastify";

const MainLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayouts;
