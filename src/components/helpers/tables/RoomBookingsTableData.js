import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {roomToEditState, refreshRoomState} from './../../../atoms/RoomsState';
import { MdRemoveCircleOutline } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import { removeRoomBooking } from './../../../api/rooms'

const RoomBookingsTableData = () => {
    const [resfreshRoom, setRefreshRoom] = useRecoilState(refreshRoomState)
    const roomData = useRecoilValue(roomToEditState)

    const removeApiCall = async (bookingId) => {
        let response = await removeRoomBooking(roomData._id, bookingId)
        setRefreshRoom({ refresh: true })
    }


    const handlePullOut = (bookingId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this file?</p>
                        <button className="btn btn-info" onClick={() => onClose()}>No</button>
                        <button className="btn btn-danger ml-3"
                            onClick={() => {
                                removeApiCall(bookingId);
                                onClose();
                            }}
                        >Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });
    }
    let bookings = roomData.bookings.map(booking=> {
            let start = moment(booking.start).format('LL');
            let end = moment(booking.end).format('LL');
            return (   
                <tr>
                    <td>{booking.bookingId}</td>
                    <td>{start}</td>
                    <td>{end}</td>
                    <td>
                        <button 
                            onClick={()=> handlePullOut(booking._id)} 
                            className="btn-sm btn btn-danger text-secondary"
                        ><MdRemoveCircleOutline /></button>
                    </td>
                </tr>
            )
        })

    return bookings
}

export default RoomBookingsTableData