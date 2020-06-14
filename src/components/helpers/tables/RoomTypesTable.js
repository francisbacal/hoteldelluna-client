import React from 'react';
import RoomTypesTableData from './RoomTypesTableData';

const RoomTypesTable = () => {
    return (
        
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <RoomTypesTableData />
            </tbody>
        </table>
    )
}

export default RoomTypesTable