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
    
    let guestsOptions = [
        <option value="1" key="1Adult">1 Adult/s</option>,
        <option value="2" key="2Adult">2 Adult/s</option>,
        <option value="3" key="3Adult">3 Adult/s</option>,
        <option value="4" key="4Adult">4 Adult/s</option>,
        <option value="5" key="5Adult">5 Adult/s</option>,
        <option value="6" key="6Adult">6 Adult/s</option>,
        <option value="7" key="7Adult">7 Adult/s</option>,
        <option value="8" key="8Adult">8 Adult/s</option>,
    ];
    
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

    const handleChangeDate = ({startDate, endDate}) => {
        setBooking({
            ...booking,
            bookingDate: {
                start: startDate,
                end: endDate
            }
        })
    }

    return (
        <div className="container-fluid roomBook" style={{ backgroundImage: "url(" + bookingBg + ")" }}>
            {/* <div className="container roomBook_container"> */}
                <div className="row justify-content-center">
                    <div className="col-12 my-5">
                        <div className="container bg-white">
                            <div className="row">
                                <div className="col">
                                    <hr className="bg-info"/>
                                    <h1 class="roomBook__title">Your Booking</h1>
                                </div>
                            </div>
                            <div className="row justify-content-center mb-4">
                                <div className="col-auto">
                                    <DateRangePicker
                                        startDate={booking.bookingDate.start}
                                        startDateId="startDateId"
                                        endDate={booking.bookingDate.end}
                                        endDateId="endDateId"
                                        onDatesChange={ handleChangeDate } 
                                        minimumNights={1}
                                        numberOfMonths={1}
                                        focusedInput={focus.focusedInput} 
                                        onFocusChange={ (focusedInput) => setFocus( { focusedInput: focusedInput }) }
                                        startDatePlaceholderText="Check-in"
                                        endDatePlaceholderText="Check-out"
                                        customArrowIcon={<span className="mr-2">|</span>}  
                                    />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                    <select onChange={(e)=>setBooking({...booking, guests: e.target.value})} class="custom-select w-auto mt-2" value={booking.guests}>
                                        {guestsOptions.map(option => {return option})}
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <hr className="bg-info"/>
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-4 roomBook__rooms">
                                    {!booking.bookingRoomDone ? <BookingRoomTypes /> : ''}
                                    {!booking.bookingCustomerInfoDone ? <BookingCustomerInfo /> : ''}
                                </div>
                                <div className="col-md-4 pr-0">
                                    <div className="container-fluid mt-4 sticky-top p-4 roomBook__summary">
                                        <hr className="bg-info" />
                                        <h3 className="roomBook__summary__title">Booking Summary</h3>
                                        <hr className="bg-info" />
                                        <div className="row justify-content-center align-items-center roomBook__summary__details">
                                            {/* <div className="col-12"> */}
                                                { booking.nextLoading ? <LoadingSpinner /> : <BookingSummary /> }
                                            {/* </div> */}
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