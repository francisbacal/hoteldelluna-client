import React, { useEffect } from 'react';
import LoadingSpinner from './../LoadingSpinner';
import { useRecoilValue, useRecoilState } from 'recoil';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactTooltip from 'react-tooltip';
import { allRoomsState, refreshRoomState } from './../../../atoms/RoomsState';
import history from './../../history'

const RoomsTableData = () => {

    const allRooms = useRecoilValue(allRoomsState);
    const [roomState, setRoomState] = useRecoilState(refreshRoomState);
    useEffect(() => {
        if (roomState !== null) {
            setRoomState({ refresh: !roomState.refresh })
        }
    }, [])

    const deleteApiCall = async (id) => {
        setRoomState({ delete: id })
    }

    const handleEdit = (id) => {
        history.push('/dashboard/rooms/' + id)
    }

    const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this file?</p>
                        <button className="btn btn-info" onClick={() => onClose()}>No</button>
                        <button className="btn btn-danger ml-3"
                            onClick={() => {
                                deleteApiCall(id);
                                onClose();
                            }}
                        >Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });
    }

    const rooms = allRooms.map(room => {
        return (
            <tr key={room._id}>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>{room.roomType.name}</td>
                <td>{room.maxguests}</td>
                <td>{room.bookings.length}</td>
                <td>{room.status}</td>
                <td>
                    <button onClick={() => handleEdit(room._id)} className="btn-sm btn btn-info text-secondary" data-tip="Edit"><FaEdit /></button>
                    &nbsp;
                    <button onClick={() => handleDelete(room._id)} className="btn-sm btn btn-danger text-secondary" data-tip="Delete"><FaTrashAlt /></button>
                    <ReactTooltip />
                </td>
            </tr>
        )
    })

    return rooms;

}


export default RoomsTableData