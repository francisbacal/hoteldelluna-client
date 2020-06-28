import React, {useState, useEffect} from 'react';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {useRecoilState, useRecoilValue} from 'recoil';
import {roomCheckState, hasCheckedState, checkedRoomsState} from './../atoms/RoomCheckState'
import { bookingState } from './../atoms/BookingState'
import BookingChooseRoom from './helpers/BookingChooseRoom';
import BookingCustomerInfo from './helpers/BookingCustomerInfo';
import BookingSummary from './helpers/BookingSummary';
import LoadingSpinner from './helpers/LoadingSpinner';
import moment from 'moment'
import bookingBg from './../assets/images/bookingbg.png'
import {Router, Route, Switch} from 'react-router-dom';
import NotFound from './errorPages/NotFound'
import history from './history'
import BookingLinks from './helpers/BookingLinks';
import Transition from './TransitionComponent';



const Book = () => {
    // eslint-disable-next-line
    const [hasChecked, setHasChecked] = useRecoilState(hasCheckedState);
    const [booking, setBooking] = useRecoilState(bookingState);
    // eslint-disable-next-line
    const [focus, setFocus] = useState({ focusedInput: null });

    const [bookDate, setBookDate] = useRecoilState(roomCheckState);

    useEffect(()=>{
        const checkin = moment(bookDate.startDate, "MM-DD-YYYY").set({hour:14,minute:0,second:0,millisecond:0});
        if (moment().isAfter(checkin)) {
            setHasChecked(false)
            setBookDate({...bookDate, startDate: checkin.add(1, 'day')});
            setBooking({
                ...booking,
                guests: bookDate.guests,
                bookingDate: {
                    start: moment(bookDate.startDate).add(1, 'day'),
                    end: moment(bookDate.startDate).add(3, 'day')
                }
            })
        } else {
            setHasChecked(false)
            setBooking({
                ...booking,
                guests: bookDate.guests,
                bookingDate: {
                    start: bookDate.startDate,
                    end: bookDate.endDate
                }
            })
        }
    // eslint-disable-next-line
    },[])

    return (
        <div className="container-fluid">
            <Transition />
            <div className="row justify-content-center roomBook" style={{ backgroundImage: "url(" + bookingBg + ")" }}>
                <div className="col-12 my-5">
                    <div className="container text-left bg-white roomBook_container">
                        <div className="row">
                            <div className="col">
                                <hr className="bg-info"/>
                                <h1 className="roomBook__title">Your Booking</h1>
                            </div>
                        </div>
                        <hr className="bg-info"/>
                        <BookingLinks/>

                        <div className="row justify-content-center flex-row-reverse">
                            <div className="col-md-4 pr-0 mb-5">
                                <div className="container-fluid mt-4 sticky-top p-4 roomBook__summary">
                                    <hr className="bg-info" />
                                    <h3 className="roomBook__summary__title">Booking Summary</h3>
                                    <hr className="bg-info" />
                                    <div className="row justify-content-center align-items-center roomBook__summary__details">
                                        { booking.nextLoading ? <LoadingSpinner /> : <BookingSummary /> }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 mt-4 roomBook__rooms">
                                <Router history={history}>
                                    <Switch>
                                        <Route exact path='/book/' component={BookingChooseRoom} />
                                        <Route path='/book/info' component={BookingCustomerInfo} />
                                        <Route component={NotFound} />
                                    </Switch>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Book;