import React from 'react';
import { DateRangePicker } from 'react-dates';
import {bookingState} from './../../atoms/BookingState';
import { useRecoilState } from 'recoil';

const DashboardEditBooking = () => {
    const [booking, setBooking] = useRecoilState(bookingState);
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

    return (
        <div className="col bg-white">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Booking - Edit</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-12 text-secondary">
                    <form>
                        <div class="form-group">
                            <label for="roomType">Choose Room:</label>
                            <input type="text" class="form-control" id="roomType" placeholder="Example input placeholder" />
                        </div>
                        <div class="form-group">
                            <select onChange={(e)=>setBooking({...booking, guests: e.target.value})} className="custom-select-sm w-auto" value={booking.guests}>
                                {guestsOptions.map(option => {return option})}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DashboardEditBooking;