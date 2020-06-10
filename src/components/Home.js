import React, { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { Redirect } from "react-router-dom";
import { useRecoilState } from 'recoil';
import moment from "moment";

import {checkRooms} from './../api/checkRooms';
import {roomCheckState, hasCheckedState} from './../atoms/RoomCheckState'


import herobanner from "./../assets/images/herobanner.jpg";
import hdlLogo from "./../assets/images/hdl-logo.png";
import "./../scss/customDRP.scss";


function Home() {
    const [bookDate, setBookDate] = useRecoilState(roomCheckState);
    const [hasChecked, setHasChecked] = useRecoilState(hasCheckedState);
    const [focus, setFocus] = useState({ focusedInput: null });

    let guestsOptions = [
        <option value="1">1 Adult/s</option>,
        <option value="2">2 Adult/s</option>,
        <option value="3">3 Adult/s</option>,
        <option value="4">4 Adult/s</option>,
        <option value="5">5 Adult/s</option>,
        <option value="6">6 Adult/s</option>,
        <option value="7">7 Adult/s</option>,
        <option value="8">8 Adult/s</option>,
    ];

    const handleCheckRooms = async () => {
            let start = encodeURIComponent(moment(bookDate.startDate).set({h:14}).format())
            let end = encodeURIComponent(moment(bookDate.endDate).format())
            
            let checkedRooms = await checkRooms(start, end, bookDate.guests);
            
            setBookDate({...bookDate, checkedRooms})
            setHasChecked(true)
    }

  return (
    <div className="container-fluid p-0 hero">
        <div className="row flex-column flex-grow-1 justify-content-center align-items-center hero no-gutters" style={{ backgroundImage: "url(" + herobanner + ")" }}>
            {hasChecked ? <Redirect to='/book' /> : ''}
            <div className="hdl-logo" style={{ backgroundImage: "url(" + hdlLogo + ")" }}></div>
            <div className="col-auto">
                <h2 className="text-center hero-message">DEL LUNA</h2>
            </div>
            <div className="col-auto mt-3">
                <div className="d-flex flex-row">
                    <div className="col-auto">
                        <DateRangePicker
                            startDate={bookDate.startDate}
                            startDateId="startDateId"
                            endDate={bookDate.endDate}
                            endDateId="endDateId"
                            onDatesChange={ ({ startDate, endDate }) => setBookDate({...bookDate, startDate, endDate }) } 
                            minimumNights={1}
                            numberOfMonths={1}
                            focusedInput={focus.focusedInput} 
                            onFocusChange={ (focusedInput) => setFocus( { focusedInput: focusedInput }) }
                            startDatePlaceholderText="Check-in"
                            endDatePlaceholderText="Check-out"
                            customArrowIcon={<span className="mr-2">|</span>} 
                        />
                    </div>
                </div>
            </div>
            <select onChange={(e)=>setBookDate({...bookDate, guests: e.target.value})} class="custom-select w-auto mt-2" value={bookDate.guests}>
                {guestsOptions.map(option=> {return option})}
            </select>
            <button type="button" onClick={handleCheckRooms} className="btn btn-primary ml-1 mt-2">Check Rooms</button>
            
        </div>
    <div className="row no-gutters">
        <div className="col-12"></div>
    </div>
    </div>
  );
}

export default Home;
