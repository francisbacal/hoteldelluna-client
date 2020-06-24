import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const BookingLinks = () => {
    return(
        <div className="booking-links">
            <NavLink exact to='/book'>Choose Room</NavLink>
            <NavLink to='/book/info'>Customer Information</NavLink>
        </div>
    )
}

export default BookingLinks;