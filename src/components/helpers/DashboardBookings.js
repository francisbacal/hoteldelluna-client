import React, { useEffect, useState } from 'react';
import BookingsTable from './tables/BookingsTable';
import { FaPlusCircle} from "react-icons/fa";
import history from './../history';
import { useRecoilState } from 'recoil';
import {getRoomTypes} from './../../api/rooms';
import {roomTypesState} from './../../atoms/BookingState';
import { toggleState } from './../../atoms/sidebarState';

const DashboardBookings = () => {
    const [roomTypes, setRoomTypes] = useRecoilState(roomTypesState);
    const [isToggled, setIsToggled] = useRecoilState(toggleState);
    const [isMounted, setIsMounted] = useState(true)

    useEffect(()=>{
        setIsMounted(true)
        if (isMounted) {
            setIsToggled(true)
            let fetchData = async () => {

                let rmTypes = await getRoomTypes()
                setRoomTypes(rmTypes)
            }

            fetchData()
            setIsMounted(false)
        }
        
    },[])

    return (
        <div className={isToggled ? "col bg-white mh-db dashboard-margin--toggle" : "col bg-white mh-db dashboard-margin"}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Bookings</h1>
                    <button onClick={() => history.push('/book')} className="btn-sm btn-success rounded" type="button"><FaPlusCircle /> New Booking</button>
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