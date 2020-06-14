import api from './../components/init'

/*==========================
| ROOM TYPES
|===========================*/


export async function addRoomType(data) {
    let response = await api.post(`/types`, data).then(res=> res.data)
    .catch(error => error.response)

    return response
}

export async function deleteRoomType(id) {
    let response = await api.delete(`/types/${id}`).then(res=> res.data)

    return response
}

export async function getRoomType(id) {
    let response = await api.get(`/types/${id}`).then(res=>res.data).catch(error => error.response)

    return response
}

export async function updateRoomType(id, formData) {
    let response = await api.put(`/types/${id}`, formData).then(res=>res.data).catch(error => error.response)

    return response
}

export async function getRoomTypes() {
   
    let response =  await api.get('/types').then(res=> res.data)
    
    return response;
}

/*==========================
| ROOMS
|===========================*/

export async function addRoom(data) {
    let response = await api.post(`/rooms/`, data).then(res=> res.data)
    .catch(error => error.response)

    return response
}

export async function getRooms() {
    let response = await api.get('/rooms').then(res=> res.data)
    return response
}

export async function deleteRoom(id) {
    let response = await api.delete(`/rooms/${id}`).then(res => res.data)

    return response
}