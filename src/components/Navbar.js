import React, { useState, useEffect } from 'react';
import brand from './../assets/images/hdl-brand.png'
// eslint-disable-next-line
import { Link, NavLink } from 'react-router-dom';
import { userState, loginResponseState } from './../atoms/UserState';
import { useRecoilState } from 'recoil';
import { setToken } from './init';
import { menuState, disabledState } from './../atoms/MenuState';
import history from './history';
import Menu from './Menu';


// eslint-disable-next-line
const Navbar = () => {
    const [menu, setMenu] = useRecoilState(menuState);
    const [isDisabled, setIsDisabled] = useRecoilState(disabledState);
    const [userDetails, setUserDetails] = useRecoilState(userState);
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState);

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

    const handleMenu = () => {
        disableMenu();
        if (menu.initial === false ) {
            setMenu({
                initial: null,
                clicked: true,
                menuName: "Close"
            })
        } else if (menu.clicked === true) {
            setMenu({
                clicked: !menu.clicked,
                menuName: "Menu"
            })
        } else if (menu.clicked === false) {
            setMenu({
                clicked: !menu.clicked,
                menuName: "Close"
            })
        }
    }

    //Check if menu should be disabled
    const disableMenu = () => {
        setIsDisabled(!isDisabled);
        setTimeout(()=>{
            setIsDisabled(false)
        },1200)
    }

    return (
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
                    <button type="button" disabled={isDisabled} onClick={handleMenu}>Menu</button>
                </div>
            </div>
            <Menu />
        </nav>
    )
}

export default Navbar;