import {atom, selector} from 'recoil';
import {getBookings} from '../api/bookings'

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

const allBookingsState = selector({
    key: 'allBookingsState',
    get: async ({get}) => {
        const response = await getBookings()
        
        if (response.error) {
            return response
        } else {
            return response
        }
    }
})

export {bookingState, agreeTerms, bookingConfirmedDetailsState, allBookingsState}