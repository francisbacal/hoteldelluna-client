import api from './../components/init'


export async function login(details) {

    let response =  await api.post('/users/login', details)
    .then(res=> res.data).catch(error => error.response)
    
    
    return response;
}

export async function register(details) {
    let response = await api.post('/users/register', details).then(res => res.data).catch(error => error.response)

    return response
}