import React from 'react';
import { useRecoilState } from 'recoil';
import {bookingState} from './../../atoms/BookingState';


const BookingCheckoutForm = () => {
    const [booking, setBooking] = useRecoilState(bookingState)

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.id]: e.target.value
        })
    }
    return(
        <div className="container-fluid">
            <form>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 p-3 border border-info">
                        <h3 className="font-weight-bold my-3">Personal Information:</h3>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input type="text" name="firstname" id="firstname" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name:</label>
                            <input type="text" name="lastname" id="lastname" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" className="form-control" required />
                        </div>
                    </div>
                </div>
                <div className="row mt-3 justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 border border-info">
                        <div class="form-group mt-3">
                            <div class="form-check">
                                <input class="form-check-input " type="checkbox" value="" id="invalidCheck3" required />
                                <label class="form-check-label" for="invalidCheck3">
                                    Please acknowledge read and acceptance to terms and conditions
                                </label>
                                <div class="invalid-feedback">
                                    Must agree to terms and conditions to proceed
                                </div>
                            </div>
                        </div>
                        <h3 className="my-3 font-weight-bold">Property Guarantee & Cancellation Policies</h3>
                        <p className="font-weight-bold">Cancellation:</p>
                        <p>
                            Free Cancellation/modification until 3 A.M., 1 day prior to arrival. 
                            A penalty of 1 night stay inclusive of tax will be charged for late cancellation/modification,
                            no show and early departure.
                        </p>
                        <p className="font-weight-bold">Guarantee:</p>
                        <p>A 10% downpaymen is required to guarantee booking. Full payment shall be settled upon check-in.</p>
                        <div class="form-group mt-3">
                            <div class="form-check">
                                <input class="form-check-input " type="checkbox" value="" id="invalidCheck3" required />
                                <label class="form-check-label" for="invalidCheck3">
                                    Please acknowledge read and acceptance to Guarantee and Cancellation Policies.
                                </label>
                                <div class="invalid-feedback">
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