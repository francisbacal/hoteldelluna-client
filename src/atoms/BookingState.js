import {atom, selector} from 'recoil';
import {getBookings, getBooking} from '../api/bookings'

const bookingState = atom({
    key: 'BookingState',
    default: {
        nextLoading: false,
        bookingRoomDone: false,
        bookingCustomerInfoDone: true,
        bookingSuccess: false,
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
const editBookingRefreshState = atom({
    key: "editBookingRefreshState",
    default: {
        refresh: null 
    }
})

const allBookingsState = selector({
    key: 'allBookingsState',
    get: async ({get}) => {

        const state = get(editBookingRefreshState);
        let response;

        if (state.refresh === null || state.refresh === true) {
            response = await getBookings()
            
            if (response.error) {
                return response.error
            } else {
                return response
            }
        }
        
    }
})

const roomTypesState = atom({
    key: 'roomTypesState',
    default: {}
})

const typesState = atom({
    key: 'typesState',
    default: []
})

const bookingToEditState = atom({
    key: 'bookingToEditState',
    default: {}
})


const editBookingState = atom({
    key: 'editBookingState',
    default: {
        bookingDate: {
            start: null,
            end: null
        },
        guests: null,
        roomType: null,
        total: 0,
    }
})


export {bookingState, agreeTerms, bookingConfirmedDetailsState, allBookingsState, bookingToEditState, roomTypesState, editBookingState, typesState, editBookingRefreshState}