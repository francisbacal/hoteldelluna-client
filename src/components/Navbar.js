import React, { useState, useEffect } from 'react';
import brand from './../assets/images/hdl-brand.png'
// eslint-disable-next-line
import { Link, NavLink, withRouter, useRouteMatch } from 'react-router-dom';
import { userState, loginResponseState } from './../atoms/UserState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { setToken } from './init';
import { menuState, disabledState } from './../atoms/MenuState';
import Menu from './Menu';
import { AiOutlineMenu} from "react-icons/ai";
import { showState } from './../atoms/sidebarState';
import {editBookingRefreshState} from './../atoms/BookingState';


// eslint-disable-next-line
const Navbar = ({history, currPath}) => {
    const [menu, setMenu] = useRecoilState(menuState);
    const [isDisabled, setIsDisabled] = useRecoilState(disabledState);
    // eslint-disable-next-line
    const [userDetails, setUserDetails] = useRecoilState(userState);
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState);
    const [showSidebar, setShowSidebar] = useRecoilState(showState);
    const [refresh, setRefresh] = useRecoilState(editBookingRefreshState);

    // const SafeLink = (props) => <Link {...props} replace={currPath === props.to} />

    //useEffect when changing routes
    useEffect(() => {
        history.listen(()=> {
            setMenu({
                clicked: false,
                menuName: "Menu"
            })
        })
    })

    let match = useRouteMatch('/dashboard')

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
        setRefresh({refresh:null})
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
    const handleShow = () => {
        setShowSidebar(!showSidebar)
    }

    //Check if menu should be disabled
    const disableMenu = () => {
        setIsDisabled(!isDisabled);
        setTimeout(()=>{
            setIsDisabled(false)
        },1000)
    }

    return (
        <div className="navbar-container">
            <nav className="navbar-hdl">
                <div className="navbar-hdl__wrapper">
                    <ul className="navbar-hdl__wrapper__ul-left">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/book">Book</NavLink>
                        </li>
                    </ul>
                    <Link className="navbar-brand" to="/"><img alt="Hotel Del Luna" src={brand} width="50%" /></Link>
                    <ul className={loginResponse.isLoggedIn ? "navbar-hdl__wrapper__ul-right--logout" : "navbar-hdl__wrapper__ul-right"}>
                        {loginResponse.isLoggedIn ?
                            <>
                                <li className="nav-item">
                                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link" onClick={handleLogout}>Logout</Link>
                                </li>
                            </>
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
                    {match ?
                    <div className="navbar-hdl__menu__side" onClick={handleShow}>
                        {menu.clicked ? '' : <AiOutlineMenu className="navbar-hdl__menu__side__icon"/> }
                    </div>
                    : ''}
                    
                    <div className="navbar-hdl__menu__button">
                        <button type="button" disabled={isDisabled} onClick={handleMenu}>{menu.menuName}</button>
                    </div>
                </div>
                <Menu />
            </nav>
        </div>
    )
}

export default withRouter(Navbar);