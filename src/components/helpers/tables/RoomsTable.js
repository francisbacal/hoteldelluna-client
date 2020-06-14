import React, { Suspense } from 'react';
import RoomsTableData from './RoomsTableData';
import ReactTooltip from 'react-tooltip';
import LoadingSpinner from '../LoadingSpinner';

const RoomsTable = () => {
    const fallback = () => {
        return(
            <div className="container hero">
                <div className="row justify-content-center align-items-center mt-5">
                    <LoadingSpinner className="mt-5"/>
                </div>
            </div>
        )
    }
    return (
        <>
        <ReactTooltip />
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Max Guests</th>
                    <th scope="col">Bookings</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            <React.Suspense fallback={fallback()}>
                <RoomsTableData />
            </React.Suspense>
            </tbody>
        </table>
        </>
    )
}

export default RoomsTable