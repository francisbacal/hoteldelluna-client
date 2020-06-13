import React, {useState, useEffect} from 'react';
import brand from './../assets/images/hdl-brand.png'
// eslint-disable-next-line
import { Link, NavLink } from 'react-router-dom';
import Menu from './helpers/Menu';
// eslint-disable-next-line
const Navbar = () => {

    // const [state, setState] = useState({
    //     initial: false,
    //     clicked: null,
    //     menuName: "Menu"
    // });

    // const [disabled, setDisabled] = useState(false);

    // useEffect(() => {
    //     //Listening for page changes.
    //     history.listen(() => {
    //       setState({ clicked: false, menuName: "Menu" });
    //     });
    //   }, [history]);


    // const handleMenu = () => {
    //     disableMenu();
    //     if (state.initial === false) {
    //         setState({
    //             initial: null,
    //             clicked: true,
    //             menuName: "Close"
    //         });
    //     } else if (state.clicked === true) {
    //         setState({
    //             clicked: !state.clicked,
    //             menuName: "Menu"
    //         });
    //     } else if (state.clicked === false) {
    //         setState({
    //             clicked: !state.clicked,
    //             menuName: "Close"
    //         });
    //     }
    // };
    // const disableMenu = () => {
    //     setDisabled(!disabled);
    //     setTimeout(() => {
    //       setDisabled(false);
    //     }, 1200);
    //   };
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-hdl">
            <Link className="navbar-brand" to="/"><img alt="Hotel Del Luna" src={brand} width="50%" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className="menu">
                <button disabled={disabled} onClick={handleMenu}>
                    {state.menuName}
                </button>
            </div> */}
            {/* <Menu /> */}
            {/* <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">The Hotel</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rooms">Rooms</NavLink>
                    </li>
                </ul>
            </div> */}
        </nav>
    )
}

export default Navbar;