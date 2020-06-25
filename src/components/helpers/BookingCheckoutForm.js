import React, { useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {bookingState, agreeTerms, bookingConfirmedDetailsState} from './../../atoms/BookingState';
import {userState} from './../../atoms/UserState';
import {confirmBooking, paySwipe} from './../../api/confirmBooking';
import ErrorMessage from './ErrorMessage';
import history from '../history';


const BookingCheckoutForm = () => {
    const [booking, setBooking] = useRecoilState(bookingState);
    const [bookingConfirmedDetails, setBookingConfirmedDetails] = useRecoilState(bookingConfirmedDetailsState);
    const [agreeToTerms, setAgreeToTerms] = useRecoilState(agreeTerms);
    const user = useRecoilValue(userState)
    const [hasError, setHasError] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const errorRef = useRef(null)

    const handleChange = (e) => {
        setBooking({
            ...booking,
            customer: {
                ...booking.customer,
                [e.target.id] : e.target.value
            }
        })
    }

    const handleCheckboxChange = (e) => {
        setAgreeToTerms({
            ...agreeToTerms,
            [e.target.id] : e.target.checked
        })
    }

    const scrollToErr = (ref) => window.scrollTo(0, ref.current.offsetTop)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setHasError(false)

        if(!booking.selectedRoom) {
            setCheckoutError("Incomplete Details. Please review your booking and try again.")
            setHasError(true)
            scrollToErr(errorRef);
            setIsLoading(false)
            return
        }

        let data= {};

        if (user._id) {

            data.customerId = user._id
            data.customer = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }

            data.bookingDate = booking.bookingDate
            data.roomType = booking.roomType
            data.guests = booking.guests
            data.total = booking.total.replace(/[^\d.]/g, '')
            
        } else {

            let {customer, bookingDate, roomType, guests, total} = booking;
            data = {...data, customer, bookingDate, roomType, guests};
            console.log(total)
            total = total.replace(/[^\d.]/g, '');

            data.total = total
        }

        const bookingConfirmation = await confirmBooking(data);

        if (bookingConfirmation.data) {

            if (bookingConfirmation.data.error.email) {
                setCheckoutError(bookingConfirmation.data.error.email+'. Please log in to continue')
            } else {
                setCheckoutError(bookingConfirmation.data.error)
            }

            setHasError(true);
            scrollToErr(errorRef);
            setIsLoading(false)

        } else {

            setBookingConfirmedDetails(bookingConfirmation);
            setIsLoading(false)
            setBooking({...booking, bookingSuccess: true})
            history.push('/transaction')

        }

    }

    return(
        <div className="container-fluid checkout">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div ref={errorRef} className="col-12 col-md-10 col-lg-8 p-3 border border-info">
                        {hasError ? <ErrorMessage error={checkoutError} /> : ''}
                        {(user._id !== null) ? <h3>Logged in as {user._firstname} {user.lastname}</h3> :
                        <>
                            <h3 className="font-weight-bold my-3">Personal Information:</h3>
                            <div className="form-group">
                                <label htmlFor="firstname">First Name:</label>
                                <input onChange={handleChange} type="text" name="firstname" id="firstname" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name:</label>
                                <input onChange={handleChange} type="text" name="lastname" id="lastname" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="form-control" required />
                                <small>*automatic account will be created using this email for new users to use Swipe payment</small>
                            </div>
                        </>
                        }
                    </div>
                </div>
                <div className="row mt-3 justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 border border-info">
                        
                        <h3 className="my-3 font-weight-bold">Property Guarantee & Cancellation Policies</h3>
                        <p className="font-weight-bold">Cancellation:</p>
                        <p>
                            Free Cancellation/modification until 3 A.M., 1 day prior to arrival. 
                            A penalty of 1 night stay inclusive of tax will be charged for late cancellation/modification,
                            no show and early departure.
                        </p>
                        <p className="font-weight-bold">Guarantee:</p>
                        <p>A 10% downpayment is required to guarantee booking (Pay with <strong>Stripe</strong> is required). Full payment shall be settled upon check-in.</p>
                        <div className="form-group mt-3">
                            <div className="form-check">
                                <input onChange={handleCheckboxChange} className="form-check-input " type="checkbox" value="" id="policiesAgree" required />
                                <label className="form-check-label" htmlFor="policiesAgree">
                                    Please acknowledge read and acceptance to Guarantee and Cancellation Policies.
                                </label>
                                <div className="invalid-feedback">
                                    Must agree to Guarantee and Cancellation policies.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    {!isLoading ?
                    <button className="btn btn-primary">CONFIRM RESERVATION</button>
                    :
                    <button class="btn btn-secondary text-warning mt-2" type="button" disabled>
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default BookingCheckoutForm;