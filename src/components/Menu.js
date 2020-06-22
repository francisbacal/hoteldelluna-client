import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { menuState } from './../atoms/MenuState';
import { useRecoilValue } from 'recoil';
 
const Menu = () => {
    const menu = useRecoilValue(menuState);

    let menuDiv = useRef(null);

    useEffect(()=>{
        if ( menu.clicked === false ) {
            //close menu
            menuDiv.style.display = "none";
        } else if ( menu.clicked === true || (menu.clicked === true && menu.initial === null) ) {
            //open menu
            menuDiv.style.display = "block";
        }
    })

    return(
        <div ref={el  => (menuDiv = el)} className="container menu">
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