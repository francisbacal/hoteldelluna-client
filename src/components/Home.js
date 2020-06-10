import React, { useState, useEffect } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import checkRooms from './../api/checkRooms'

import "./../scss/customDRP.scss";

import herobanner from "./../assets/images/herobanner.jpg";
import hdlLogo from "./../assets/images/hdl-logo.png";
import { Redirect } from "react-router-dom";

function Home() {
  const [bookDate, setBookDate] = useState({
    startDate: null,
    endDate: null,
    guests: 2
  });

  const [focus, setFocus] = useState({ focusedInput: null });
  const [hasChecked, setHasChecked] = useState(false)

  const handleCheckRooms = async () => {
        let start = encodeURIComponent(moment(bookDate.startDate).set({h:14}).format())
        let end = encodeURIComponent(moment(bookDate.endDate).format())
        
        let rooms = await checkRooms(start, end, bookDate.guests);
        console.log(rooms)
        setHasChecked(true)

  }

  useEffect(()=> {
    console.log('checked')
  }, [hasChecked])

  return (
    <>
    <div className="hero no-gutters">
        {hasChecked ? <Redirect to='/book' /> : ''}
        <div className="hero-banner" style={{ backgroundImage: "url(" + herobanner + ")" }}></div>
        <div className="hero-message">
            <div className="hdl-logo" style={{ backgroundImage: "url(" + hdlLogo + ")" }}></div>
            <h2 className="text-center">DEL LUNA</h2>
            <DateRangePicker
                startDate={bookDate.startDate}
                startDateId="startDateId"
                endDate={bookDate.endDate}
                endDateId="endDateId"
                onDatesChange={({ startDate, endDate }) =>
                setBookDate({...bookDate, startDate, endDate })
                } // PropTypes.func.isRequired,
                minimumNights={3}
                numberOfMonths={1}
                focusedInput={focus.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) =>
                setFocus({ focusedInput: focusedInput })
                } // PropTypes.func.isRequired,
            />
            <select onChange={(e)=>setBookDate({...bookDate, guests: e.target.value})} class="custom-select" value={bookDate.guests}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button type="button" onClick={handleCheckRooms} className="btn btn-primary ml-1">Check</button>
        </div>
    </div>
    <div className="row no-gutters">
        <div className="col-12"></div>
    </div>
    </>
  );
}

export default Home;
