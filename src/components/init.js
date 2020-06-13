import axios from 'axios';

const baseURL = "http://localhost:5000"; //change after

const api = axios.create({baseURL: baseURL})

//delete after dev
let token2 = localStorage.getItem('hdlToken')
api.defaults.headers.common['Authorization'] = `Bearer ${token2}`
//delete lines above after dev

export function setToken(token) {
    if (token) {
        localStorage.setItem('hdlToken', token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        localStorage.removeItem('hdlToken')
        delete api.defaults.headers.common['Authorization']
    }
}

export default api