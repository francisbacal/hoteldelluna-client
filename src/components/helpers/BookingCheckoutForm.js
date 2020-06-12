import React from 'react';
import { useRecoilState } from 'recoil';
import {bookingState, agreeTerms, bookingConfirmedDetailsState} from './../../atoms/BookingState';
import {confirmBooking} from './../../api/confirmBooking';


const BookingCheckoutForm = () => {
    const [booking, setBooking] = useRecoilState(bookingState)
    const [bookingConfirmedDetails, setBookingConfirmedDetails] = useRecoilState(bookingConfirmedDetailsState)
    const [agreeToTerms, setAgreeToTerms] = useRecoilState(agreeTerms);

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        let {customer, bookingDate, roomType, guests} = booking;
        const data = {customer, bookingDate, roomType, guests};

        const bookingConfirmation = await confirmBooking(data);

        if (bookingConfirmation.error) {

            throw bookingConfirmation.error;
        }

        setBookingConfirmedDetails(bookingConfirmation)

        console.log(bookingConfirmation)
        
    }

    return(
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 p-3 border border-info">
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
                        </div>
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
                        <p>A 10% downpayment is required to guarantee booking. Full payment shall be settled upon check-in.</p>
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
                    <button className="btn btn-primary">CONFIRM RESERVATION</button>
                </div>
            </form>
        </div>
    )
}

export default BookingCheckoutForm;