import React, {useState, useEffect} from 'react';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import {useRecoilState, useRecoilValue} from 'recoil';
import {roomCheckState, hasCheckedState, checkedRoomsState} from './../atoms/RoomCheckState'
import { bookingState } from './../atoms/BookingState'
import BookingRoomTypes from './helpers/BookingRoomTypes';
import BookingCustomerInfo from './helpers/BookingCustomerInfo';
import BookingSummary from './helpers/BookingSummary';
import LoadingSpinner from './helpers/LoadingSpinner';

import bookingBg from './../assets/images/bookingbg.png'


function Book() {
    // eslint-disable-next-line
    const [hasChecked, setHasChecked] = useRecoilState(hasCheckedState);
    const [booking, setBooking] = useRecoilState(bookingState);
    const [focus, setFocus] = useState({ focusedInput: null });

    const bookDate = useRecoilValue(roomCheckState);

    const processComponent = () => {

        if (!booking.bookingRoomDone) {
            return <BookingRoomTypes />
        } else if (!booking.bookingCustomerInfoDone) {
            return <BookingCustomerInfo />
        }


    }

    useEffect(()=>{
        setHasChecked(false)
        setBooking({
            ...booking,
            guests: bookDate.guests,
            bookingDate: {
                start: bookDate.startDate,
                end: bookDate.endDate
            }
        })
    // eslint-disable-next-line
    },[])

    return (
        <div className="container-fluid roomBook" style={{ backgroundImage: "url(" + bookingBg + ")" }}>
            {/* <div className="container roomBook_container"> */}
                <div className="row justify-content-center">
                    <div className="col-12 my-5">
                        <div className="container text-left bg-white roomBook_container">
                            <div className="row">
                                <div className="col">
                                    <hr className="bg-info"/>
                                    <h1 className="roomBook__title">Your Booking</h1>
                                </div>
                            </div>
                            <hr className="bg-info"/>
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-4 roomBook__rooms">
                                    {processComponent()}
                                </div>
                                <div className="col-md-4 pr-0 mb-5">
                                    <div className="container-fluid mt-4 sticky-top p-4 roomBook__summary">
                                        <hr className="bg-info" />
                                        <h3 className="roomBook__summary__title">Booking Summary</h3>
                                        <hr className="bg-info" />
                                        <div className="row justify-content-center align-items-center roomBook__summary__details">
                                            { booking.nextLoading ? <LoadingSpinner /> : <BookingSummary /> }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            {/* </div> */}
        </div>
    );
}

export default Book;