import React, { useState, useEffect } from 'react'
import ErrorMessage from './ErrorMessage';
import { getRoomTypes, getRoom, updateRoom } from './../../api/rooms'
import { roomToEditState, refreshRoomState } from './../../atoms/RoomsState'
import { useRecoilState } from 'recoil';
import history from './../history'
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import RoomBookingsTableData from './tables/RoomBookingsTableData';

const DashboardEditRoom = () => {
    const [roomToEdit, setRoomToEdit] = useRecoilState(roomToEditState)
    const [resfreshRoom, setRefreshRoom] = useRecoilState(refreshRoomState)
    const [roomTypesState, setRoomTypesState] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [addResponse, setAddResponse] = useState({
        error: null
    })

    const { id } = useParams()
    useEffect(() => {
        const getData = async () => {
            setIsFetching(true)
            let roomTypes = await getRoomTypes();
            let room = await getRoom(id)

            setRoomTypesState(roomTypes)
            setRoomToEdit(room)
            
            setIsFetching(false)
        }
        getData()
    }, [])

    const fallback = () => {
        return (
            <div className="container hero">
                <div className="row justify-content-center align-items-center mt-5">
                    <LoadingSpinner className="mt-5" />
                </div>
            </div>
        )
    }

    const guestsOptions = [
        <option value="1" key="1Adult">1 Adult/s</option>,
        <option value="2" key="2Adult">2 Adult/s</option>,
        <option value="3" key="3Adult">3 Adult/s</option>,
        <option value="4" key="4Adult">4 Adult/s</option>,
        <option value="5" key="5Adult">5 Adult/s</option>,
        <option value="6" key="6Adult">6 Adult/s</option>,
        <option value="7" key="7Adult">7 Adult/s</option>,
        <option value="8" key="8Adult">8 Adult/s</option>,
    ];

    const roomTypesOptions = roomTypesState.map(roomType => {
        return <option value={roomType._id} key={roomType._id}>{roomType.name}</option>
    })
    const handleSubmit = async (e) => {
        e.preventDefault()

        let response = await updateRoom(id, roomToEdit)
        if (response.data) {

            let error = response.data.error;

            if (error.name) {
                setAddResponse({
                    error: error.name
                })
            } else if (typeof error == 'object') {
                let err = error[Object.keys(error)[0]];

                if (err.includes('name')) {
                    error = "Room already exists"
                }

                setAddResponse({
                    error: error
                })
            } else {

                setAddResponse({
                    error: error
                })
            }

        } else {
            setRefreshRoom({ refresh: true })
            history.push('/dashboard/rooms')
        }
    }

    const handleChange = (e) => {
        setRoomToEdit({
            ...roomToEdit,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="col bg-white addType">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Room - Edit</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
            </div>
            <div className="row ml-5">
                <div className="col-12 col-md-8 col-lg-4 text-secondary">
                    {addResponse.error ? <ErrorMessage error={addResponse.error} /> : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group w-auto dbBookings__edit">
                            <label htmlFor="name">Room #:</label>
                            <input onChange={handleChange} type="number" value={roomToEdit.name} className="form-control w-auto" id="name" required />
                        </div>
                        <div className="form-group w-auto dbBookings__edit">
                            <label htmlFor="roomType">Room Type</label>
                            <select onChange={handleChange} id="roomType" name="roomType" value={roomToEdit.roomType} className="form-control w-auto" required>
                                {roomTypesOptions}
                            </select>
                        </div>
                        <div className="form-group w-auto dbBookings__edit w-auto">
                            <label htmlFor="maxguests">Max Guests</label>
                            <select onChange={handleChange} className="form-control w-auto" name="maxguests" id="maxguests" required value={roomToEdit.maxguests}>
                                {guestsOptions.map(option => { return option })}
                            </select>
                        </div>
                        <button className="btn btn-primary">EDIT</button>
                    </form>
                </div>
                <div className="col-12 col-md-4 col-lg-8 text-secondary">
                    <div className="container">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Booking ID</th>
                                    <th scope="col">Checkin</th>
                                    <th scope="col">Checkout</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching ? <LoadingSpinner /> : <RoomBookingsTableData />}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardEditRoom