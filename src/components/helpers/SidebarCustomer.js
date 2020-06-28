import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaMoon, FaTicketAlt, FaDoorOpen, FaDotCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import { toggleState, toggleShow, showState } from './../../atoms/sidebarState'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

const SidebarCustomer = () => {
    const [isToggled, setIsToggled] = useRecoilState(toggleState);
    const showSidebar = useRecoilValue(showState);
    const resetShow = useResetRecoilState(toggleShow);


    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    const handleShow = () => {
        resetShow()
    }
    return (
        <>
        <div className={isToggled ? "sidebarover--toggle" : "sidebarover"}/>
        <div className="sidebar">
            <ProSidebar collapsed={isToggled} breakPoint={"sm"} toggled={showSidebar} onToggle={handleShow}>
                <SidebarHeader>
                    <Menu iconShape="square" onClick={handleToggle}>
                        <div className="side-icon">
                        <IconContext.Provider value={{ size: '2.5rem' }}>
                            {isToggled
                                ?
                                <AiOutlineMenuUnfold
                                    onClick={handleToggle}
                                    className="side-icon__hamburger" />
                                :
                                <AiOutlineMenuFold
                                    onClick={handleToggle}
                                    className="side-icon__hamburger" />
                            }
                        </IconContext.Provider>
                        <p onClick={handleToggle} className={isToggled ? "sidebar__title--none" : "sidebar__title"}>Navigation</p>
                        </div>
                        
                    </Menu>
                    
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaMoon />}>
                            <Link to="/dashboard">Dashboard</Link>
                        </MenuItem>
                        <MenuItem icon={<FaTicketAlt/>}>Bookings
                            <Link to='/dashboard/bookings' />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
        </>
    )
}

export default SidebarCustomer