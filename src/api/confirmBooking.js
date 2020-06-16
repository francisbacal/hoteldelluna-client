import api from './../components/init'


export async function paySwipe(swipeData) {
    let response = await api.post('/bookings/stripe', swipeData).then(res => res.data).catch(err => err.response)
    return response
}


export async function confirmBooking(booking) {
    let response = await api.post('/bookings/', booking).then(res=> res.data).catch(err => err.response)
    return response
}