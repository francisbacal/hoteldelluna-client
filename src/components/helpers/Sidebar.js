import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaMoon, FaTicketAlt, FaDoorOpen, FaDotCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = () => {
        console.log(isToggled)
        setIsToggled(!isToggled)
        console.log(isToggled)
    }
    return (
        <>
        <div className={isToggled ? "sidebarover--toggle" : "sidebarover"}/>
        <div className="sidebar">
            <ProSidebar collapsed={isToggled} breakPoint={"sm"}>
                
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
                        <SubMenu icon={<FaDoorOpen />} title="Rooms">
                            <MenuItem icon={<FaDotCircle/>}>
                            <Link to='/dashboard/rooms'>Rooms</Link>
                            </MenuItem>
                            <MenuItem icon={<FaDotCircle/>}>
                            <Link to='/dashboard/roomtypes'>Types</Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>

                </SidebarFooter>
            </ProSidebar>
        </div>
        </>
    )
}

export default Sidebar