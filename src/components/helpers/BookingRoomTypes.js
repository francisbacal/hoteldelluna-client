import React from 'react';
import moment from 'moment'

import LoadingSpinner from './LoadingSpinner'

import {checkedRoomsState, roomCheckState} from './../../atoms/RoomCheckState';
import {bookingState} from './../../atoms/BookingState';
import { useRecoilValueLoadable, useRecoilValue, useRecoilState } from 'recoil';


const BookingRoomTypes = () => {
    
    const [booking, setBooking] = useRecoilState(bookingState)
    const roomState = useRecoilValue(roomCheckState)
    const checkedRooms = useRecoilValueLoadable(checkedRoomsState);
    const url = "http://localhost:5000/public/images/";

    const handleSelect = (e) => {
        e.preventDefault();
        const diff = moment(booking.bookingDate.end).diff(moment(booking.bookingDate.start))
        const numberOfNights = diff / (1000*3600*24);
        const totalPrice = numberOfNights * e.target.total.value;

        let currencyPrice = new Intl.NumberFormat('tl-PH', { 
            currency: 'PHP',
            style: 'decimal'
        }).format(totalPrice);

        setBooking({
            ...booking,
            room: e.target.room.value,
            total: currencyPrice,
            nextLoading: true,
            bookingRoomDone: true,
            bookingCustomerInfoDone: false
        })

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
                                    <button className="btn btn-primary">Select</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            })

            return(
                <div className="container-fluid">
                    <h3 className="text-center roomBook__rooms__title">Choose your room</h3>
                    <div className="row roomBook__rooms__list">
                        <div className="col-12">
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

            throw checkedRooms.contents

    }
}

export default BookingRoomTypes