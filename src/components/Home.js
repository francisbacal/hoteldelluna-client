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
    const [focus, setFocus] = useState({focusedInput: null});

    let guestsOptions = [
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
        setBookDate({...bookDate, startDate, endDate})

    }

  return (
    <div className="container-fluid p-0 hero">
        <div className="row flex-column flex-grow-1 justify-content-center align-items-center hero no-gutters" style={{ backgroundImage: "url(" + herobanner + ")" }}>
            {hasChecked ? <Redirect to='/book' /> : ''}
            <div className="hdl-logo" style={{ backgroundImage: "url(" + hdlLogo + ")" }}></div>
            <div className="col-auto">
                <h2 className="text-center hero-message display-4">Out of This World Experience</h2>
            </div>
            <div className="col-auto mt-3">
                <div className="d-flex flex-row">
                    <div className="col-auto">
                        <DateRangePicker
                            startDate={bookDate.startDate}
                            startDateId="startDateId"
                            endDate={bookDate.endDate}
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
                        />
                    </div>
                </div>
            </div>
            <select onChange={(e)=>setBookDate({...bookDate, guests: e.target.value})} className="custom-select w-auto mt-2" value={bookDate.guests}>
                {guestsOptions.map(option=> {return option})}
            </select>
            <button type="button" onClick={()=> setHasChecked(true)} className="btn btn-primary ml-1 mt-2">Check Rooms</button>
            
        </div>
    <div className="row no-gutters">
        <div className="col-12"></div>
    </div>
    </div>
  );
}

export default Home;
