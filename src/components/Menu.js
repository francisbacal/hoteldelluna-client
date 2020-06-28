import React, { useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { menuState } from './../atoms/MenuState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState, loginResponseState } from './../atoms/UserState';
import {editBookingRefreshState} from './../atoms/BookingState';
import { setToken } from './init';
import history from '../components/history';
import gsap from 'gsap';

 
const Menu = () => {
    const menu = useRecoilValue(menuState);
    const [userDetails, setUserDetails] = useRecoilState(userState);
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState);
    const [refresh, setRefresh] = useRecoilState(editBookingRefreshState);

    //DOM nodes
    let menuDiv = useRef(null);
    let revealMenuDiv = useRef(null);
    let revealMenuDivBg = useRef(null);
    let menuHome = useRef(null);
    let menuBook = useRef(null);
    let menuUser = useRef(null);

    useEffect(()=>{
        if ( menu.clicked === false ) {
            //close menu
            fadeDown(menuUser, menuHome, menuBook);
            gsap.to([ revealMenuDiv, revealMenuDivBg], {
                duration: .8,
                height: 0,
                ease: 'power3.inOut',
                delay: 0.3,
                stagger: {
                    amount: 0.04
                }
            })
            gsap.to(menuDiv, { duration: 1, css: { display: "none" } });
        } else if ( menu.clicked === true || (menu.clicked === true && menu.initial === null) ) {
            //open menu
            gsap.to(menuDiv, { duration: 0, css: { display: "block" } });
            gsap.to([revealMenuDivBg, revealMenuDiv], {
                duration: 0,
                opacity: 1,
                height: '100%'
            });
            staggerReveal(revealMenuDivBg, revealMenuDiv);
            fadeUp(menuUser, menuHome, menuBook);
        }
    }, [menu]);

    const staggerReveal = (node1, node2) => {
        gsap.from([node1, node2], {
            duration: 0.5,
            height: 0,
            transformOrigin: 'right top',
            skewY: 2,
            ease: 'power.inOut',
            stagger: {
                amount: 0.1
            }
        })
    }

    const fadeUp = (node1, node2, node3) => {
        gsap.to([node1, node2, node3], {
           y: 0,
           duration: 1,
           opacity: 1,
           delay: 0.1,
           ease: 'power3.inOut' ,
           stagger: {
               amount: 0.1
           }
        })
    }

    const fadeDown = (node1, node2, node3) => {
        gsap.to([node1, node2, node3], {
           y: 60,
           duration: 0.5,
           opacity: 0,
           ease: 'power3.inOut' ,
           stagger: {
               amount: 0.1
           }
        })
    }

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

    return(
        <div ref={el  => (menuDiv = el)} className="menu">
            <div ref={el  => (revealMenuDiv = el)} className="menu__contents">
                {!loginResponse.isLoggedIn ?
                <div ref={el  => (menuUser = el)} className="menu__contents__user">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </div>
                :
                <div ref={el  => (menuUser = el)} className="menu__contents__user">
                    <p>
                        Welcome&nbsp;
                        <NavLink className="nav-link--user" to="/dashboard">{userDetails.firstname +' '+ userDetails.lastname}</NavLink>
                    </p>
                    <Link to="#" className="nav-link--logout" onClick={handleLogout}>Logout</Link>
                </div>
                }
                <nav className="menu__contents__nav">
                    <ul className="menu__contents__nav__ul">
                        <li ref={el  => (menuHome = el)} className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li  ref={el  => (menuBook = el)} className="nav-item">
                            <NavLink className="nav-link" to="/book">Book</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div ref={el  => (revealMenuDivBg = el)} className="menu__secondary-bg"></div>
        </div>
    )
}

export default Menu;