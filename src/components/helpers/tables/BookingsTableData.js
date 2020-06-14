import React from 'react';
import { allBookingsState } from './../../../atoms/BookingState';
import LoadingSpinner from './../LoadingSpinner';
import { useRecoilValueLoadable } from 'recoil';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import moment from 'moment';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';


const BookingsTableData = () => {

    const allBookings = useRecoilValueLoadable(allBookingsState);
    const [showDialog, setShowDialog] = useState(false)
    const [deleteID, setDeleteID] = useState(null)

    const deleteApiCall = (id) => {
        console.log('delete',id)
    }
    const handleDelete = (id) => {
        // console.log(id)
        // setDeleteID(id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this file?</p>
                        <button onClick={() => onClose()}>No</button>
                        <button
                            onClick={() => {
                                deleteApiCall(id);
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                  </button>
                    </div>
                );
            }
        });
    }

    switch (allBookings.state) {

        case 'hasValue':

            const bookings = allBookings.contents.map(booking => {
                const checkin = moment(booking.bookingDate.start).format('LL')
                const checkout = moment(booking.bookingDate.end).format('LL')
                return (
                    <>
                    <tr key={booking._id}>
                        <td>{booking._id}</td>
                        <td>{booking.roomType.name}</td>
                        <td>{checkin}</td>
                        <td>{checkout}</td>
                        <td>
                            <Link to={`/dashboard/bookings/${booking._id}`} className="btn-sm btn btn-info text-secondary"><FaEdit />Edit</Link>
                        </td>
                    </tr>
                    </>
                )
            })

            return bookings

        case 'loading':
            return (
                <div className="container-fluid bg-white tableLoading">
                    <h4 className="text-center roomBook__rooms__title">Loading Data</h4>
                    <div className="row justify-content-center align-items-center mt-5">
                        <LoadingSpinner />
                    </div>
                </div>
            )

        case 'hasError':
            return (
                <div className="container-fluid bg-white tableError">
                    <div className="row justify-content-center align-items-center mt-5">
                        <h4 className="text-center roomBook__rooms__title">Oops! Something went wrong.</h4>
                    </div>
                </div>
            )
    }
}


export default BookingsTableData