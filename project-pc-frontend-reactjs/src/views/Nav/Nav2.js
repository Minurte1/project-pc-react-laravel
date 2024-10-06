import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

import logo from "./ICON.ico"
import desktop from "./DESKTOP.ico"
import apple from "./APPLE.ico"
import asus from "./ASUS.ico"

import './Nav2.scss'

class Nav2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
        };
    }

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/khachhang", {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Yêu cầu không thành công");
            }

            const jsonResponse = await response.json();

            this.setState({
                data: jsonResponse.data,
                loading: false,
            });

            console.log(jsonResponse);
        } catch (error) {
            console.error(error.message);
            this.setState({
                error: error.message,
                loading: false,
            });
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    handleViewHomePage = () => {
        // Điều hướng về trang "/"
        this.props.history.push("/");
    };

    handleViewDesktop = () => {
        this.props.history.push("/Desktop");
    };

    handleViewApple = () => {
        this.props.history.push("/Apple");
    };

    handleViewASUS = () => {
        this.props.history.push("/ASUS");
    };

    handleViewAll = () => {
        this.props.history.push("/All");
    };

    render() {
        const { data, loading, error } = this.state;
        return (
            <div className='navbar_Nav2' id='navbar'>
                <div className='nav_Nav2'>
                    <div className='isOpen_Nav2'>
                        <a className='image-navbar_Nav2' onClick={this.handleViewHomePage}>
                            <div className='image_Nav2'>
                                <img src={logo} alt="ShopPC Logo" />
                                <span>ShopPC</span>
                            </div>
                        </a>
                        <div className="ml-auto_Nav2" >
                            <a onClick={this.handleViewDesktop} className='nav-item_Nav2 nav-item1_Nav2'><img src={desktop} alt="Desktop logo" /><span>Desktop</span></a>
                            <a onClick={this.handleViewApple} className='nav-item_Nav2 nav-item2_Nav2'><img src={apple} alt="Desktop logo" /><span>Apple</span></a>
                            <a onClick={this.handleViewASUS} className='nav-item_Nav2'><img src={asus} alt="Desktop logo" /><span>ASUS</span></a>
                            <a onClick={this.handleViewAll} className='nav-item_Nav2 nav-item4_Nav2'>Tất Cả</a>
                        </div>
                        <div className='cart-div_Nav2'>
                            <a href="">
                                <FontAwesomeIcon icon={faUser} /> {data && data.length > 0 && data[0].TenLienHe}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Sử dụng withRouter để có thể sử dụng history trong class component
export default withRouter(Nav2);
