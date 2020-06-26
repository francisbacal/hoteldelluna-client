import React, { useState, useEffect } from 'react'
import ErrorMessage from './ErrorMessage';
import {getRoomTypes, addRoom} from './../../api/rooms'
import { roomToAddState, refreshRoomState } from './../../atoms/RoomsState'
import { useRecoilState } from 'recoil';
import history from './../history';
import { toggleState } from './../../atoms/sidebarState';

const DashboardAddRoom = () => {
    const [isToggled, setIsToggled] = useRecoilState(toggleState);
    const [roomToAdd, setRoomToAdd] = useRecoilState(roomToAddState)
    const [resfreshRoom, setRefreshRoom] = useRecoilState(refreshRoomState)
    const [roomTypesState, setRoomTypesState] = useState([])
    const [addResponse, setAddResponse] = useState({
        error: null
    })

    useEffect(()=> {
        const getTypes = async () => {
            let roomTypes = await getRoomTypes();

            setRoomTypesState(roomTypes)
        }

        getTypes()
    },[])

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
        
        let response = await addRoom(roomToAdd)
        console.log(roomToAdd)
        if(response.data) {

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
            setRefreshRoom({refresh: true})
            history.push('/dashboard/rooms')
        }
    }

    const handleChange = (e) => {
        setRoomToAdd({
            ...roomToAdd,
            [e.target.id]: e.target.value
        })
    }

    return( 
        <div className={isToggled ? "col bg-white addType dashboard-margin--toggle" : "col bg-white addType dashboard-margin"}>
             <div className="row justify-content-center align-items-center">
                 <div className="col-12 dbBookings">
                     <h1 className='dbBookings__title'>Room - Add</h1>
                 </div>
             </div>
             <div className="row justify-content-center align-items-center">      
             </div>
             <div className="row align-items-center">
                <div className="col-12 col-md-8 col-lg-4 text-secondary">
                    {addResponse.error ? <ErrorMessage error={addResponse.error} /> : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group w-auto dbBookings__edit">
                            <label htmlFor="name">Room #:</label>
                            <input onChange={handleChange} type="number" className="form-control w-auto" id="name" required />
                        </div>
                        <div className="form-group w-auto dbBookings__edit">
                            <label htmlFor="roomType">Room Type</label>
                            <select onChange={handleChange} id="roomType" name="roomType" className="form-control w-auto" required>
                                {roomTypesOptions}
                            </select>
                        </div>
                        <div className="form-group w-auto dbBookings__edit w-auto">
                            <label htmlFor="maxguests">Max Guests</label>
                            <select onChange={handleChange} className="form-control w-auto" name="maxguests" id="maxguests" required value={roomToAdd.maxguests}>
                                {guestsOptions.map(option => {return option})}
                            </select>
                        </div>
                        <button className="btn btn-primary">ADD</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DashboardAddRoom