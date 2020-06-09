import React from 'react';

import { Link, NavLink } from 'react-router-dom';

const Navbar = ({}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/categories">Categories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                    </li>
                </ul>
            </div>
            <Link className="navbar-brand mr-auto" to="/">PushCart</Link>
            
        </nav>
    )
}

export default Navbar;