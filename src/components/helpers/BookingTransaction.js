import React from 'react';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
import {bookingState, bookingConfirmedDetailsState} from './../../atoms/BookingState'

import bookingBg from './../../assets/images/bookingbg.png';
import { Redirect } from 'react-router-dom';

const BookingTransaction = () => {

    const bookingConfirmedDetails = useRecoilValue(bookingConfirmedDetailsState);
    const booking = useRecoilValue(bookingState);


        
    let name
    let email
    let checkin
    let checkout
    let guests
    let receipt

    if (booking.bookingSuccess) {

        name = bookingConfirmedDetails.booking.customer.firstname +" "+bookingConfirmedDetails.booking.customer.lastname;
        email = bookingConfirmedDetails.booking.customer.email
        checkin = moment(bookingConfirmedDetails.booking.bookingDate.start).format('MMM DD YYYY');
        checkout = moment(bookingConfirmedDetails.booking.bookingDate.end).format('MMM DD YYYY');
        guests = bookingConfirmedDetails.booking.guests;
        receipt = bookingConfirmedDetails.payment.receipt_url

    } else {

        name = 'null';
        email = 'null'
        checkin = 'null';
        checkout = 'null';
        guests = 'null';
        receipt = 'null';

    }


    return (
        <div className="container-fluid roomBook" style={{ backgroundImage: "url(" + bookingBg + ")" }}>
            {!booking.bookingSuccess ? <Redirect to='/book' /> : ''}
            <div className="row justify-content-center ">
                <div className="col-12 my-5">
                    <div className="container text-left bg-white transactionContainer">
                        <div className="row">
                            <div className="col">
                                <hr className="bg-info"/>
                                <h1 className="roomBook__title">Your Booking is now confirmed</h1>
                                <h3 className="roomBook__title">We are excited to see you!</h3>
                            </div>
                        </div>
                        <hr className="bg-info"/>
                        <div className="row justify-content-center my-5">
                            <div className="col-md-8 col-lg-6 mt-4 roomBook__rooms">
                                <div className="row">
                                    <div className="col-auto">
                                        <p>Customer Name:</p>
                                    </div>
                                    <div className="col-auto">
                                        <p>{name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <p>Customer Email:</p>
                                    </div>
                                    <div className="col-auto">
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <p>Check-in:</p>
                                    </div>
                                    <div className="col-auto">
                                        <p>{checkin}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <p>Check-out:</p>
                                    </div>
                                    <div className="col-auto">
                                        <p>{checkout}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <p>Expected Guest(s)</p>
                                    </div>
                                    <div className="col-auto">
                                        <p>{guests}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <p>Receipt:</p>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={() => window.open(receipt, '_blank')}  className="btn-sm btn-primary">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BookingTransaction;