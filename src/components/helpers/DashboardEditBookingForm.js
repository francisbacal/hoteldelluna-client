import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import { useRecoilState } from 'recoil';
import { typesState, editBookingState } from './../../atoms/BookingState'
import moment from 'moment'
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import {checkRooms} from './../../api/checkRooms'
import LoadingSpinner from './LoadingSpinner';
import { updateBookingAPI } from './../../api/bookings';
import history from './../history'



const DashboardEditBookingForm = () => {

    let [roomTypes, setRoomTypes] = useRecoilState(typesState);
    let [updatedBooking, setUpdatedBooking] = useRecoilState(editBookingState);
    let [error, setError] = useState({
        hasError: false,
        message: null
    })
    let [focus, setFocus] = useState({ focusedInput: null });
    let [isLoading, setIsLoading] = useState(false)
    let [isFetching, setIsFetching] = useState(false)
    let [isSuccess, setIsSuccess] = useState({
        status: false,
        message: null
    })

    useEffect(()=>{
        if (!updatedBooking.booking || !roomTypes) {
            setIsFetching(true)
        } else {
            setIsFetching(false)
        }
    }, [updatedBooking, roomTypes])


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

    const roomTypesOptions = roomTypes.map(roomType => {
        let type = roomType.roomType
        return <option value={type._id} key={type._id}>{type.name} - ${type.price}</option>
    })


    const handleChangeDate = ({ startDate, endDate }) => {
        setIsLoading(true)
        setUpdatedBooking({
            booking: {
                ...updatedBooking.booking,
                bookingDate: {
                    start: startDate,
                    end: endDate
                }
            }
        })        
        
        setIsLoading(false)
    }
    const handleChange = (e) => {
        setUpdatedBooking({
            booking: {
                ...updatedBooking.booking,
                roomType: e.target.value
            }
        })
    }

    const updateRooms = async () => {
        setIsLoading(true)
        const start = await updatedBooking.booking.bookingDate.start
        const end = await updatedBooking.booking.bookingDate.end

        let rooms = await checkRooms(
            start, 
            end, 
            updatedBooking.booking.guests).catch(error=>error.response)

        setRoomTypes(rooms)
        setIsLoading(false)
        
    }
    const updateBooking = async () => {
        setIsLoading(true)
        const { 
            bookingDate, 
            customer, 
            guests, 
            hasEnded,
            isCancelled,
            roomType,
            total,
            _id
        } = updatedBooking.booking

        const data = { 
            bookingDate, 
            customer, 
            guests, 
            hasEnded,
            isCancelled,
            roomType,
            total,
            _id
        }

        const booking = await updateBookingAPI(data._id, data)
        setIsLoading(false)

        if (booking != undefined || !booking.error) {
            setIsSuccess({
                status: true,
                message: "Update Success"
            })
        } else {
            setError({
                hasError: true,
                message: "Sorry. Something went wrong."
            })
        }

        // history.push('/dashboard/bookings')
    }

    const handleCheckChange =  (e) => {
        let value = false;

        if (e.target.checked) {
            value = true;
        } else {
            value = false;
        }

        setUpdatedBooking({
            booking: {
                ...updatedBooking.booking,
                [e.target.name] : value
            }
        })

    }

    return (
        <>
            {(!updatedBooking.booking) ? <LoadingSpinner /> :
            <>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                    {error.isError ? <ErrorMessage error={error.message} /> : ''}
                    {isSuccess.status ? <SuccessMessage message={isSuccess.message} /> : ''}
                </div>
            </div>
            <h3 className="text-primary">Booking No. {updatedBooking.booking._id}</h3>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-4 text-secondary dbBookings__edit">
                    <p>Booking Date</p>
                    <DateRangePicker
                        startDate={moment(updatedBooking.booking.bookingDate.start)}
                        startDateId="startDateId"
                        endDate={moment(updatedBooking.booking.bookingDate.end)}
                        endDateId="endDateId"
                        onDatesChange={handleChangeDate}
                        minimumNights={1}
                        numberOfMonths={1}
                        focusedInput={focus.focusedInput}
                        onFocusChange={(focusedInput) => setFocus({ focusedInput: focusedInput })}
                        startDatePlaceholderText="Check-in"
                        endDatePlaceholderText="Check-out"
                        customArrowIcon={<span className="mr-2">|</span>}
                        required={true}
                        readOnly={true}
                        small={true}
                    />
                </div>
            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-12 col-md-8 col-lg-4 text-secondary">
                    <form>
                        <div className="form-group dbBookings__edit">
                            <label htmlFor="roomType d-block">Guests</label>
                            <select 
                                onChange={(e) => setUpdatedBooking(
                                    { 
                                        booking: {
                                            ...updatedBooking.booking,
                                            guests: e.target.value
                                        } 
                                    }
                                )} 
                                className="custom-select-sm w-auto d-block" 
                                defaultValue={updatedBooking.booking.guests }
                            >
                                {guestsOptions.map(option => { return option })}
                            </select>
                        </div>
                        <div className="form-group w-auto dbBookings__edit">
                            <label htmlFor="roomType">Choose Room</label>
                            <select onChange={handleChange} id="roomType" name="roomType" value={updatedBooking.booking.roomType} className="form-control w-auto" required>
                                {roomTypesOptions}
                            </select>
                        </div>
                        <div className="form-check form-check-inline dbBookings__edit">
                            <input defaultChecked={updatedBooking.hasEnded} onChange={handleCheckChange} className="form-check-input" type="checkbox" id="hasEnded" name="hasEnded" />
                            <label className="form-check-label" htmlFor="hasEnded">Booking Ended</label>
                        </div>
                        <div className="form-check form-check-inline dbBookings__edit">
                            <input defaultChecked={updatedBooking.isCancelled} onChange={handleCheckChange} className="form-check-input" type="checkbox" id="isCancelled" name="isCancelled" />
                            <label className="form-check-label" htmlFor="isCancelled">Booking Cancelled</label>
                        </div>
                        <div className="col my-3">
                            {!isLoading ?
                            <>
                                <button onClick={updateRooms} type="button" className="btn-sm btn-primary mx-2">Check Room</button>
                                <button onClick={updateBooking} type="button" className="btn-sm btn-success">Update</button>
                            </>
                            :
                                <button class="btn btn-secondary text-warning mt-2" type="button" disabled>
                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            </>
            }
        </>
    )
}


export default DashboardEditBookingForm