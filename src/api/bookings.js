import api from './../components/init'


export async function getBookings() {
   
    let response =  await api.get('/bookings/').then(res=> res.data)
    
    return response;
}