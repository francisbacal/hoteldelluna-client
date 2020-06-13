import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return(
        <div className="menu">
            <div className="menu-secondary-bg">
                <div className="menu-layer">
                    <div className="menu-layer__container">
                        <div className="menu-layer__container__wrapper">
                            <div className="menu-layer__container__wrapper__links">
                                <nav>
                                    <ul>
                                        <li>
                                            <Link to='/dashboard'></Link>
                                        </li>
                                        <li>
                                            <Link to='/login'></Link>
                                        </li>
                                        <li>
                                            <Link to='/logout'></Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu