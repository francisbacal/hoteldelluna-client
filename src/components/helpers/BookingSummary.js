import React from 'react';
import moment from 'moment';

import LoadingSpinner from './LoadingSpinner'

import {bookingState} from './../../atoms/BookingState';
import { useRecoilValue } from 'recoil';


const BookingSummary = () => {

    const url = "http://localhost:5000/public/images/";
    const bookingSummary = useRecoilValue(bookingState)

    

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
                        <span className="roomBook__summary__details__price">&#8369; {bookingSummary.total}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookingSummary