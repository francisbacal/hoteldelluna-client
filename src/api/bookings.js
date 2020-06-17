import api from './../components/init'


export async function getBookings() {
   
    let response =  await api.get('/bookings/').then(res=> res.data)
    
    return response;
}
export async function getBooking(id) {
   
    let response =  await api.get(`/bookings/${id}`).then(res=> res.data)
    
    return response;
}
export async function updateBookingAPI(id, data) {
   
    let response =  await api.put(`/bookings/${id}`, data).then(res=> res.data)
    
    return response;
}