import React from 'react';
import BookingsTable from './tables/BookingsTable'

const DashboardBookings = () => {
    return (
        <div className="col bg-white">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Bookings</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-12 text-secondary">
                    <BookingsTable />  
                </div>
            </div>
        </div>
    )
}

export default DashboardBookings