import {atom, selector} from 'recoil';
import {getBookings, getBooking} from '../api/bookings'

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

const roomTypesState = atom({
    key: 'roomTypesState',
    default: {}
})

const bookingToEditState = atom({
    key: 'bookingToEditState',
    default: {}
})


const editBookingState = selector({
    key: 'editBookingState',
    get: async ({get}) => {
        let id = get(bookingToEditState)

        const response = await getBooking(id);

        return response
    }
})


export {bookingState, agreeTerms, bookingConfirmedDetailsState, allBookingsState, roomTypesState, bookingToEditState, editBookingState}