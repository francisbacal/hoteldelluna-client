import {atom} from 'recoil';

const bookingState = atom({
    key: 'BookingState',
    default: {
        nextLoading: false,
        bookingRoomDone: false,
        bookingCustomerInfoDone: true,
        room: null,
        roomType: null,
        guests: null,
        total: 0,
        customer: {
            email: null,
            firstname: null,
            lastname: null
        },
        bookingDate: {
            start: null,
            end: null
        }
    }
})

const agreeTerms = atom ({
    key: "bookingTerms",
    default: {
        policiesAgree: false
    }
})

const bookingConfirmedDetailsState = atom({
    key: "bookingConfirmedDetailsState",
    default: {}
})

export {bookingState, agreeTerms, bookingConfirmedDetailsState}