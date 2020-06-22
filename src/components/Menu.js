import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return(
        <div className="container menu">
            <div className="row h-100 align-items-center menu__contents">
                <div className="col">
                    <ul className="menu__contents__ul">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/book">Book</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="menu_secondary-bg"></div>
        </div>
    )
}

export default Menu;