import api from './../components/init'


export async function confirmBooking(booking) {
    let response = api.post('/bookings/', booking).then(res=> res.data)
    return response
}