import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil'

import {bookingState} from './../../atoms/BookingState'

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

    return('CUSTOMER')
}


export default BookingCustomerInfo;