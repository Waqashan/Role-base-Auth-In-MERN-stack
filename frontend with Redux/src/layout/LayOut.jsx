import React from "react";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
const LayOut = (props) => {
  return (
    <>
      <NavBar />
      <Outlet/>
      {/* <Footer /> */}
    </>
  );
};

export default LayOut;