import React from 'react';
import RoomTypesTable from './tables/RoomTypesTable';
import { FaPlusCircle, FaExternalLinkAlt} from "react-icons/fa";
import { Link } from 'react-router-dom';

const DashboardRoomTypes = () => {
    return (
        <div className="col bg-white">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Room Types</h1>
                    <Link to='/book' className="btn-sm btn-success rounded" type="button"><FaPlusCircle /> Add New Type</Link>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-12 text-secondary">
                    <RoomTypesTable />
                </div>
            </div>
        </div>
    )
}

export default DashboardRoomTypes