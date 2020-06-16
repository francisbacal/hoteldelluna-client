import React from 'react'
import { Link } from 'react-router-dom';

import { FaPlusCircle } from "react-icons/fa";
import RoomsTable from './tables/RoomsTable';

const DashboardRooms = () => {
    return (
        <div className="col bg-white mh-db">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Rooms</h1>
                    <Link to='/dashboard/rooms/add' className="btn-sm btn-success rounded" type="button">
                        <FaPlusCircle /> Add New Room
                    </Link>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-12 text-secondary">
                    <RoomsTable />
                </div>
            </div>
        </div>
    )
}

export default DashboardRooms