import React from 'react';
import LoadingSpinner from './../LoadingSpinner';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import {deleteRoomType} from './../../../api/rooms'
import { allRoomsTypesState, toBeDeletedTypeState } from './../../../atoms/RoomsState';

const RoomTypesTableData = () => {

    const AllRoomTypes = useRecoilValueLoadable(allRoomsTypesState);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteID, setDeleteID] = useRecoilState(toBeDeletedTypeState);


    const deleteApiCall = async (id) => {
        console.log('delete',id)
        setDeleteID(id)
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


    switch (AllRoomTypes.state) {

        case 'hasValue':

            const roomTypes = AllRoomTypes.contents.map(roomType => {
                let currencyPrice = new Intl.NumberFormat('tl-PH', { 
                    currency: 'PHP',
                    style: 'decimal'
                }).format(roomType.price);
                return (
                    <>
                    <ReactTooltip />
                    <tr key={roomType._id}>
                        <td>{roomType._id}</td>
                        <td>{roomType.name}</td>
                        <td>{roomType.description}</td>
                        <td>&#8369; {currencyPrice} /night</td>
                        <td>
                            <Link to={`/dashboard/roomtypes/${roomType._id}`} className="btn-sm btn btn-info text-secondary" data-tip="Edit"><FaEdit /></Link>
                            &nbsp;
                            <button onClick={()=> handleDelete(roomType._id)} className="btn-sm btn btn-danger text-secondary" data-tip="Delete"><FaTrashAlt /></button>
                        </td>
                    </tr>
                    </>
                )
            })

            return roomTypes;

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


export default RoomTypesTableData