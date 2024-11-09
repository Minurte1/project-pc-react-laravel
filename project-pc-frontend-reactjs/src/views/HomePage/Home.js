import React, { Component } from "react";

import "./HomePage.scss";

import Nav2 from "../../share-view/Nav2";
import Slider from "../Slider/Slider";
import ListSanPham from "../SanPham/ListSanPham";
import Footer from "../../share-view/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="home-container">
          <Slider />
          <ListSanPham />
          <ToastContainer />
        </div>
      </>
    );
  }
}

export default Home;
