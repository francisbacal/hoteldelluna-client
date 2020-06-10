import React from 'react';
import brand from './../assets/images/hdl-brand.png'
// eslint-disable-next-line
import { Link, NavLink } from 'react-router-dom';
// eslint-disable-next-line
const Navbar = ({}) => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-hdl">
            <Link className="navbar-brand" to="/"><img alt="Hotel Del Luna" src={brand} width="50%" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">The Hotel</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rooms">Rooms</NavLink>
                    </li>
                </ul>
            </div> */}
        </nav>
    )
}

export default Navbar;