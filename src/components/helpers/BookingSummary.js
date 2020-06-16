import React from 'react';
import moment from 'moment';

import {bookingState} from './../../atoms/BookingState';
import { useRecoilValue } from 'recoil';


const BookingSummary = () => {

    const url = "http://hoteldellunaserver.herokuapp.com/public/images/";
    const bookingSummary = useRecoilValue(bookingState)

    const deposit =  new Intl.NumberFormat('en-US', { 
        currency: 'USD',
        style: 'decimal'
    }).format(bookingSummary.total.toString().replace(/[^\d.]/g, '') * 0.10);

    

    return(
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-12">
                    <p>
                        <span className="roomBook__summary__details__title">Your Stay: </span>
                        <span>{moment(bookingSummary.bookingDate.start).format('LL')}</span>
                        <span> - </span>
                        <span> {moment(bookingSummary.bookingDate.end).format('LL')}</span>
                    </p>
                    <p>
                        <span className="roomBook__summary__details__title">Guests: </span>
                        <span>{bookingSummary.guests}</span>
                        <span>&nbsp;</span>
                        <span>person(s)</span>
                    </p>
                    <p>
                        <span className="roomBook__summary__details__title">Your Room: </span>
                        <span>&nbsp;&nbsp;</span>
                        <span>{bookingSummary.room}</span>
                    </p>
                    <p>
                        <span className="roomBook__summary__details__title">Total Price: </span>
                        <span>&nbsp;</span>
                        <span className="roomBook__summary__details__price">$ {bookingSummary.total}</span>
                    </p>
                    <p>
                        <span className="roomBook__summary__details__title">Please pay( </span>
                        <span className="roomBook__summary__details__price">$ {deposit}</span>
                        <span className="roomBook__summary__details__title"> )to confirm your reservation</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookingSummary