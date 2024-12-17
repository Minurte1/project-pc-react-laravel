import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 d-flex flex-column px-5">
            <h4 className="text-center py-3 border-bottom border-secondary">Admin Panel</h4>
            <ul className="nav flex-column px-3">
                <li className="nav-item mb-2 nav-link text-white btn btn-outline-light btn-sm">
                    <Link
                        className="text-center"
                        to="/dashboard"
                    >
                        <i className="bi bi-speedometer2"></i> Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white btn btn-outline-light btn-sm rounded-pill text-center"
                        to="/admin/users"
                    >
                        <i className="bi bi-people"></i> Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link text-white btn btn-outline-light btn-sm rounded-pill text-center"
                        to="/admin/settings"
                    >
                        <i className="bi bi-gear"></i> Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;