import api from './../components/init'


export async function deleteRoomType(id) {
    let response = await api.delete(`/types/${id}`).then(res=> res.data)

    return response
}


export async function getRoomTypes() {
   
    let response =  await api.get('/types').then(res=> res.data)
    
    return response;
}