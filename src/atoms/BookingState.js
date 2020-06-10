import {atom} from 'recoil';

const bookingState = atom({
    key: 'BookingState',
    default: {
        customerEmail: null,
        roomType: null,
        guests: null,
        bookingDate: {
            start: null,
            end: null
        }
    }
})

export {bookingState}