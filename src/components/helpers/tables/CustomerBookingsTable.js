import React from 'react';
import BookingsCustomerTableData from './BookingsCustomerTableData'


const BookingsTable = () => {

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Booking I.D.</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Checkin</th>
                        <th scope="col">Checkout</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <BookingsCustomerTableData />
                </tbody>
            </table>
        </div>
    )
}

export default BookingsTable