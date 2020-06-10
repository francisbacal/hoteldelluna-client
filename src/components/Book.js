import React, {useState, useEffect} from 'react';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { Redirect } from "react-router-dom";
import moment from 'moment'
import {useRecoilState, useRecoilValue} from 'recoil';
import {roomCheckState, hasCheckedState} from './../atoms/RoomCheckState'
import { bookingState } from './../atoms/BookingState'


function Book() {
    // eslint-disable-next-line
    const [hasChecked, setHasChecked] = useRecoilState(hasCheckedState);
    const [booking, setBooking] = useRecoilState(bookingState);
    const [focus, setFocus] = useState({ focusedInput: null });

    const bookDate = useRecoilValue(roomCheckState);
    
    let guestsOptions = [
        <option value="1">1 Adult/s</option>,
        <option value="2">2 Adult/s</option>,
        <option value="3">3 Adult/s</option>,
        <option value="4">4 Adult/s</option>,
        <option value="5">5 Adult/s</option>,
        <option value="6">6 Adult/s</option>,
        <option value="7">7 Adult/s</option>,
        <option value="8">8 Adult/s</option>,
    ];
    
    useEffect(()=>{
        setHasChecked(false)
        setBooking({
            ...booking,
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
        console.log(booking)
    }


    return (
        <div className="container roomBook">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h1 class="roomBook__title">Booking</h1>
                </div>
            </div>
            <div className="row justify-content-center">
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
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                <select onChange={(e)=>setBooking({...booking, guests: e.target.value})} class="custom-select w-auto mt-2" value={bookDate.guests}>
                    {guestsOptions.map(option => {return option})}
                </select>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="container-fluid bg-light mt-4">
                        <h3>Choose your room</h3>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="container-fluid bg-light mt-4 sticky-top">
                        <h3>Choose your room</h3>
                        <div className="row">
                            <div className="col-12">
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                                <h1>ROOM</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Book;