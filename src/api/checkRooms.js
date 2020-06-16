import api from './../components/init'
import moment from 'moment';


export async function checkRooms(dateStart, dateEnd, guests) {
   
    let start = moment(dateStart).format('MM-DD-YYYY')
    let end = moment(dateEnd).format('MM-DD-YYYY')
    
    let response =  await api.get(`/rooms/${start}/${end}/${guests}`).then(res=> res.data)
    
    return response;
}