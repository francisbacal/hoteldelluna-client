import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {bookingState} from './../../atoms/BookingState';
import BookingCheckoutForm from './BookingCheckoutForm';

const BookingCustomerInfo = () => {

    const [booking, setBooking] = useRecoilState(bookingState);

    useEffect(()=>{
        setTimeout(()=>{

            setBooking({
                ...booking,
                nextLoading: false
            })

        }, 300)
        
    // eslint-disable-next-line
    },[])

    return(
        <div className="container mb-5">
            <h3 className="text-center roomBook__rooms__title">Checkout</h3>
            <div className="row roomBook__rooms__list">
                <div className="col-12">
                    <BookingCheckoutForm />
                </div>
            </div>
        </div>
    )
}


export default BookingCustomerInfo;