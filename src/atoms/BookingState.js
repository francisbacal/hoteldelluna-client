import {atom} from 'recoil';

const bookingState = atom({
    key: 'BookingState',
    default: {
        nextLoading: false,
        bookingRoomDone: false,
        bookingCustomerInfoDone: true,
        customerEmail: null,
        room: null,
        roomType: null,
        guests: null,
        total: 0,
        bookingDate: {
            start: null,
            end: null
        }
    }
})

export {bookingState}