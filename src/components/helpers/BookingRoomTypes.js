import React, {useState, useEffect} from 'react';
import moment from 'moment'
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

import LoadingSpinner from './LoadingSpinner'

import {checkedRoomsState, roomCheckState} from './../../atoms/RoomCheckState';
import {bookingState} from './../../atoms/BookingState';
import { useRecoilValueLoadable, useRecoilValue, useRecoilState } from 'recoil';


const BookingRoomTypes = () => {
    
    const [booking, setBooking] = useRecoilState(bookingState);
    const [bookDate, setBookDate] = useRecoilState(roomCheckState);
    const checkedRooms = useRecoilValueLoadable(checkedRoomsState);
    const [focus, setFocus] = useState({focusedInput: null});

    const url = "http://localhost:5000/public/images/";

    const guestsOptions = [
        <option value="1" key="1Adult">1 Adult/s</option>,
        <option value="2" key="2Adult">2 Adult/s</option>,
        <option value="3" key="3Adult">3 Adult/s</option>,
        <option value="4" key="4Adult">4 Adult/s</option>,
        <option value="5" key="5Adult">5 Adult/s</option>,
        <option value="6" key="6Adult">6 Adult/s</option>,
        <option value="7" key="7Adult">7 Adult/s</option>,
        <option value="8" key="8Adult">8 Adult/s</option>,
    ];

    const handleSelect = (e) => {
        e.preventDefault();
        const diff = moment(booking.bookingDate.end).diff(moment(booking.bookingDate.start))
        const numberOfNights = Math.floor(diff / (1000*3600*24));
        const totalPrice = numberOfNights * e.target.total.value;

        let currencyPrice = new Intl.NumberFormat('tl-PH', { 
            currency: 'PHP',
            style: 'decimal'
        }).format(totalPrice);

        setBooking({
            ...booking,
            room: e.target.room.value,
            total: currencyPrice,
            roomType: e.target.roomType.value,
            nextLoading: true,
            bookingRoomDone: true,
            bookingCustomerInfoDone: false
        })

    }

    const handleChangeDate = ({startDate, endDate}) => {

        setBooking({
            ...booking,
            bookingDate: {
                start: startDate,
                end: endDate
            }
        })
        setBookDate({...bookDate, startDate, endDate})

    }


    switch (checkedRooms.state) {

        case 'hasValue':
            const checkedRoomsList = checkedRooms.contents.map(room => {
                let img = room.roomType.images[1].name
                let price = new Intl.NumberFormat('tl-PH', { 
                    currency: 'PHP',
                    style: 'decimal'
                }).format(room.roomType.price);
                return(
                    <div className="container-fluid my-3" key={room._id}>
                        <div className="row">
                            <div className="col-auto mr-3">
                                <img src={url+img} alt={room.roomType.name}/>
                            </div>
                            <div className="col p-2 border-top border-bottom border-info">
                                <h2>{room.roomType.name}</h2>
                                <p>{room.roomType.description}</p>
                                <p className="roomBook__rooms__list__price">&#8369;{price}</p>
                                <form onSubmit={handleSelect}>
                                    <input type="hidden" name="room" value={room.roomType.name} />
                                    <input type="hidden" name="total" value={room.roomType.price} />
                                    <input type="hidden" name="roomType" value={room.roomType._id} />
                                    <button className="btn btn-primary">Select</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            })

            return(
                <div className="container-fluid">
                    <div className="row align-items-center pickerSmall">
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
                            required={true}
                            readOnly={true}
                            small={true}  
                        />
                        <div className="col-auto">
                            <select onChange={(e)=>setBooking({...booking, guests: e.target.value})} className="custom-select-sm w-auto" value={booking.guests}>
                                {guestsOptions.map(option => {return option})}
                            </select>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center mb-4">
                        <h3 className="text-center roomBook__rooms__title">Choose your room</h3>
                    </div>
                    <div className="row roomBook__rooms__list">
                            <div className="col-12 mb-5">
                                {checkedRoomsList}
                            </div>
                        </div>
                </div>
            );

        case 'loading':

            return(
                <div className="container-fluid bg-light my-4">
                    <h3 className="text-center roomBook__rooms__title">Choose your room</h3>
                    <div className="row justify-content-center align-items-center mt-5">
                        <LoadingSpinner />
                    </div>
                </div>
            );

        case 'hasError':

            // throw checkedRooms.contents
            return(
                <div className="container-fluid my-4">
                    <div className="row align-items-center">
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
                            required={true}
                            readOnly={true}
                            small={true}  
                        />
                        <div className="col-auto">
                            <select onChange={(e)=>setBooking({...booking, guests: e.target.value})} className="custom-select-sm w-auto" value={booking.guests}>
                                {guestsOptions.map(option => {return option})}
                            </select>
                        </div>
                    </div>
                    <h3 className="text-center roomBook__rooms__title">Choose your room</h3>
                    <div className="row justify-content-center align-items-center mt-5">
                        <div className="col-12">
                            <h4 className="text-danger text-center">No Available Rooms</h4>
                        </div>
                    </div>
                </div>
            )

    }
}

export default BookingRoomTypes