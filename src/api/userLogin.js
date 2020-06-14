import api from './../components/init'


export async function login(details) {

    let response =  await api.post('/users/login', details)
    .then(res=> res.data).catch(error => error.response)
    
    
    return response;
}