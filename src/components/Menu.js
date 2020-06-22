import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { menuState } from './../atoms/MenuState';
import { useRecoilValue } from 'recoil';
import gsap from 'gsap';
 
const Menu = () => {
    const menu = useRecoilValue(menuState);

    //DOM nodes
    let menuDiv = useRef(null);
    let revealMenuDiv = useRef(null);
    let revealMenuDivBg = useRef(null);
    let menuHome = useRef(null);
    let menuBook = useRef(null);

    useEffect(()=>{
        if ( menu.clicked === false ) {
            //close menu
            fadeDown(menuHome, menuBook);
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
            fadeUp(menuHome, menuBook);
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

    const fadeUp = (node1, node2) => {
        gsap.to([node1, node2], {
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

    const fadeDown = (node1, node2) => {
        gsap.to([node1, node2], {
           y: 60,
           duration: 0.5,
           opacity: 0,
           ease: 'power3.inOut' ,
           stagger: {
               amount: 0.1
           }
        })
    }

    return(
        <div ref={el  => (menuDiv = el)} className="menu">
            <div ref={el  => (revealMenuDiv = el)} className="menu__contents">
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
            <div ref={el  => (revealMenuDivBg = el)} className="menu_secondary-bg"></div>
        </div>
    )
}

export default Menu;