import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaMoon, FaTicketAlt, FaDoorOpen } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isToggled, setIsToggled] = useState(true)

    const handleToggle = () => {
        console.log(isToggled)
        setIsToggled(!isToggled)
        console.log(isToggled)
    }
    return (
        <div className="sidebar">
            <ProSidebar collapsed={isToggled}>
                
                <SidebarHeader>
                    <Menu iconShape="square" onClick={handleToggle}>
                        <div className="side-icon">
                        <IconContext.Provider value={{ size: '1.5rem' }}>
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
                        <p onClick={handleToggle} class="sidebar__title">HOTEL DEL LUNA</p>
                        </div>
                        
                    </Menu>
                    
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaMoon />}>Dashboard
                            <Link to="/dashboard" />
                        </MenuItem>
                        <MenuItem icon={<FaTicketAlt />} >Bookings
                            <Link to="/bookings" />
                        </MenuItem>
                        <SubMenu icon={<FaDoorOpen />} title="Rooms">
                            <MenuItem>Types</MenuItem>
                            <MenuItem>Lists</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>

                </SidebarFooter>
            </ProSidebar>
        </div>
    )
}

export default Sidebar