import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { getBooking } from './../../api/bookings'
import { useParams } from 'react-router-dom';
import {typesState, editBookingState} from './../../atoms/BookingState'
import moment from 'moment';
import LoadingSpinner from './LoadingSpinner';
import DashboardEditBookingForm from './DashboardEditBookingForm'
import {checkRooms} from './../../api/checkRooms'
import ErrorMessage from './ErrorMessage';


const DashboardEditBooking = () => {
    const [updatedBooking, setUpdatedBooking] = useRecoilState(editBookingState); 
    const [roomTypes, setRoomTypes] = useRecoilState(typesState); 
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState({
        isError: false,
        message: null
    });


    let { id } = useParams();

    useEffect(() => {
        setIsFetching(true)
        setError({
            isError: false,
            message: null
        })
        let getData = async () => {

            const booking = await getBooking(id)
            let start = moment(booking.bookingDate.start).format()
            let end = moment(booking.bookingDate.end).format()
            setUpdatedBooking({booking, bookingDate: {
                start: start,
                end: end
            }})

            const typesData = await checkRooms(booking.bookingDate.start, booking.bookingDate.end, booking.guests).catch(error => error.response)
            
            let err;
            if (typesData.data) {
                err = typesData.data.error
                setError({
                    isError: true,
                    message: err
                })
            } else {
                setRoomTypes(typesData)
            }
        }
        getData()

        setIsFetching(false)

    }, [])
    return (
        <div className="col bg-white mh-db">
            
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Booking - Edit</h1>
                </div>
            </div>
            {error.isError ? <ErrorMessage error={error.message} /> : '' }
            {isFetching ? <LoadingSpinner/> : <DashboardEditBookingForm/>}
        </div>
    )
}
        
  

export default DashboardEditBooking;