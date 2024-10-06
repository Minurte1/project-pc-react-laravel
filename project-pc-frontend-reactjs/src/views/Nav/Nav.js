import React from "react";

import logo from '../../assets/images/logo.gif'

import './Nav.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import {
    Link, NavLink
} from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <>
                <nav>
                    <div className="top-nav">
                        <ul>
                            <li>
                                <div className="logo"><img src={logo} alt="" /></div>
                            </li>
                            <li><button className="top-nav-btn"><a href="/cart"><FontAwesomeIcon icon={faCartShopping} className='font-awe' />Giỏ hàng</a></button></li>
                            <li>
                                <div className="search-box">
                                    <button className="search-box-btn"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}
export default Nav;