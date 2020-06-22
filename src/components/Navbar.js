import React, { useState, useEffect } from 'react';
import brand from './../assets/images/hdl-brand.png'
// eslint-disable-next-line
import { Link, NavLink } from 'react-router-dom';
import { userState, loginResponseState } from './../atoms/UserState';
import { useRecoilState } from 'recoil';
import { setToken } from './init';
import history from './history';
import Menu from './Menu';
// eslint-disable-next-line
const Navbar = () => {
    const [userDetails, setUserDetails] = useRecoilState(userState)
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState)

    const handleLogout = (e) => {
        e.preventDefault()
        setToken(null)
        setUserDetails({
            _id: null,
            firstname: null,
            lastname: null,
            email: null
        })
        setLoginResponse({ ...loginResponse, isLoggedIn: false })
        history.push('/')
    }

    return (
        // <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-hdl">
        //     <Link className="navbar-brand" to="/"><img alt="Hotel Del Luna" src={brand} width="50%" /></Link>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //      <div className="collapse navbar-collapse ml-auto" id="navbarNav">
        //         <ul className="navbar-nav">
        //             <li className="nav-item">
        //                 <NavLink className="nav-link" to="/">Home</NavLink>
        //             </li>
        //             <li className="nav-item">
        //                 <NavLink className="nav-link" to="/book">Book</NavLink>
        //             </li>
        //             {loginResponse.isLoggedIn ? 
        //                 <li className="nav-item">
        //                     <NavLink to="#" className="nav-link" onClick={handleLogout}>Logout</NavLink>
        //                 </li>
        //             :
        //             <>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/login">Login</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" to="/register">Register</NavLink>
        //                 </li>
        //             </>
        //             }
        //         </ul>
        //     </div>
        // </nav>
        <nav className="navbar-hdl">
            <div className="navbar-hdl__wrapper">
                <ul className="navbar-hdl__wrapper__ul-left">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/book">Book</NavLink>
                    </li>
                </ul>
                <Link className="navbar-brand" to="/"><img alt="Hotel Del Luna" src={brand} width="50%" /></Link>
                <ul className="navbar-hdl__wrapper__ul-right">
                    {loginResponse.isLoggedIn ?
                        <li className="nav-item">
                            <NavLink to="#" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                        </li>
                        :
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
            <div className="navbar-hdl__menu">
                <div className="navbar-hdl__menu__button">
                    <button>Menu</button>
                </div>
            </div>
            <Menu />
        </nav>
    )
}

export default Navbar;