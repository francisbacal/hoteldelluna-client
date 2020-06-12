import api from './../components/init'
import axiosInstance from 'axios'


export async function login(details) {

    let response =  await api.post('/users/login', details)
    .then(res=> res.data).catch(error => error.response)
    
    
    return response;
}