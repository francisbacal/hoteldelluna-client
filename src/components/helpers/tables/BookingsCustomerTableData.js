import React from 'react';
import { allBookingsState } from './../../../atoms/BookingState';
import LoadingSpinner from './../LoadingSpinner';
import { useRecoilValueLoadable } from 'recoil';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';


const BookingsTableData = () => {

    const allBookings = useRecoilValueLoadable(allBookingsState);

    switch (allBookings.state) {

        case 'hasValue':

            const bookings = allBookings.contents.map(booking => {
                const checkin = moment(booking.bookingDate.start).format('LL')
                const checkout = moment(booking.bookingDate.end).format('LL')
                return (
                    
                    <tr key={booking._id}>
                        <td>{booking._id}</td>
                        <td>{booking.roomType.name}</td>
                        <td>{checkin}</td>
                        <td>{checkout}</td>
                        <td>
                            <Link to={`/dashboard/customer-bookings/${booking._id}`} className="btn-sm btn btn-info text-secondary"><FaEdit />Edit</Link>
                        </td>
                    </tr>
                )
            })

            return bookings

        case 'loading':
            return (
                <tr>
                    <td colSpan='5'>
                        <div className="container-fluid bg-white tableLoading w-auto">
                            <h4 className="text-center roomBook__rooms__title">Loading Data</h4>
                            <div className="row justify-content-center align-items-center mt-5">
                                <LoadingSpinner />
                            </div>
                        </div>
                    </td>
                </tr>
            )

        case 'hasError':
            return (
                <tr>
                    <td colSpan='5'>
                        <div className="container-fluid bg-white tableError">
                            <div className="row justify-content-center align-items-center mt-5 w-auto">
                                <h4 className="text-center roomBook__rooms__title">Oops! Something went wrong.</h4>
                            </div>
                        </div>
                    </td>
                </tr>
            )
    }
}


export default BookingsTableData