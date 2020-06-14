import React, {useState} from 'react';
import { DateRangePicker } from 'react-dates';
import { useRecoilState } from 'recoil';


const DashboardEditBooking = () => {
    const [updatedDate, setUpdatedDate] = useState({
        start: null,
        end: null
    });
    const [focus, setFocus] = useState({focusedInput: null});

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

    const handleChangeDate = ({startDate, endDate}) => {

        // setBooking({
        //     ...booking,
        //     bookingDate: {
        //         start: startDate,
        //         end: endDate
        //     }
        // })
        // setBookDate({...bookDate, startDate, endDate})

    }

    return (
        <div className="col bg-white">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Booking - Edit</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                    {/* <DateRangePicker
                        startDate={booking.bookingDate.start}
                        startDateId="startDateId"
                        endDate={booking.bookingDate.end}
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
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-4 text-secondary">
                    <form>
                        <div class="form-group w-auto dbBookings__edit">
                            <label for="roomType">Choose Room:</label>
                            <input type="text" class="form-control" id="roomType" />
                        </div>
                        <div class="form-group">
                            {/* <select onChange={(e)=>setBooking({...booking, guests: e.target.value})} className="custom-select-sm w-auto" value={booking.guests}>
                                {guestsOptions.map(option => {return option})}
                            </select> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DashboardEditBooking;