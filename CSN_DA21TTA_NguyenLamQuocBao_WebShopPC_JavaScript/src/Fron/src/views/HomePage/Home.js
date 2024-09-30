import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import './HomePage.scss'

import Nav2 from "../Nav/Nav2";
import Slider from "../Slider/Slider";
import ListSanPham from "../SanPham/ListSanPham";
import Footer from "../Footer/Footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Home extends React.Component {

    render() {
        return (
            <>
                <div className="home-container">
                    <Nav2 />
                    <Slider />
                    <ListSanPham />
                    <Footer />

                    <ToastContainer />
                </div>

            </>
        )
    }
}

export default Home;