import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { useEffect } from 'react';
import { getBooking } from './../../api/bookings'
import { useParams } from 'react-router-dom';
import {roomTypesState, bookingToEditState, editBookingState} from './../../atoms/BookingState'
import history from './../history';
import moment from 'moment';
import LoadingSpinner from './LoadingSpinner';
import api from './../init'


const DashboardEditBooking = () => {
    const [updatedDate, setUpdatedDate] = useState({
        start: null,
        end: null
    });
    const [focus, setFocus] = useState({ focusedInput: null });
    const [bookingToEdit, setBookingToEdit] = useRecoilState(bookingToEditState);
    const [roomTypes, setRoomTypes] = useRecoilState(roomTypesState); 
    const [isFetching, setIsFetching] = useState(true);
    const [updatedData, setUpdatedData] = useState({});

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

    let { id } = useParams();

    useEffect(() => {

        let getData = async () => {
            await api.get(`bookings/${id}`).then(res=>{
                
                let start = moment(res.data.bookingDate.start).format()
                let end = moment(res.data.bookingDate.end).format()

                setUpdatedData(res.data)
                setUpdatedData({...updatedData, bookingDate: {start,end}})

            })
        }

        getData()


    }, [])
    



    // const roomTypesOptions = roomTypes.map(roomType => {
    //     return <option value={roomType._id} key={roomType._id}>{roomType.name}</option>
    // })


    const handleChangeDate = ({ startDate, endDate }) => {

        // setBooking({
        //     ...booking,
        //     bookingDate: {
        //         start: startDate,
        //         end: endDate
        //     }
        // })
        // setBookDate({...bookDate, startDate, endDate})

    }
    console.log(updatedData)
    const handleChange = (e) => {
        setBookingToEdit({
            ...bookingToEdit,
            [e.target.id]: e.target.value
        })
    }
                return (
                    <div className="col bg-white mh-db">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 dbBookings">
                                <h1 className='dbBookings__title'>Booking - Edit</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            {/* <DateRangePicker
                                    startDate={updatedData.bookingDate.start}
                                    startDateId="startDateId"
                                    endDate={updatedData.bookingDate.end}
                                    endDateId="endDateId"
                                    onDatesChange={ handleChangeDate } 
                                    minimumNights={1}
                                    numberOfMonths={1}
                                    focusedInput={focus.focusedInput} 
                                    onFocusChange={ (focusedInput) => setFocus( { focusedInput: focusedInput }) }
                                    startDatePlaceholderText="Check-in"
                                    endDatePlaceholderText="Check-out"
                                    customArrowIcon={<span className="mr-2">|</span>}
                                    required={true}
                                    readOnly={true}
                                    small={true}  
                                /> */}
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 col-md-8 col-lg-4 text-secondary">
                                <form>
                                    <div className="form-group w-auto dbBookings__edit">
                                        <label htmlFor="roomType">Choose Room</label>
                                        {/* <select onChange={handleChange} id="roomType" name="roomType" value={bookingToEdit.roomType} className="form-control w-auto" required>
                                            {roomTypesOptions}
                                        </select> */}
                                    </div>
                                    <div class="form-group">
                                        <select onChange={(e) => setBookingToEdit({ ...bookingToEdit, guests: e.target.value })} className="custom-select-sm w-auto" value={bookingToEdit.guests}>
                                            {guestsOptions.map(option => { return option })}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
        } 
  

export default DashboardEditBooking;