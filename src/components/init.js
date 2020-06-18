import axios from 'axios';


// export const baseUrl = process.env.NODE_ENV === 'development' ? 'https://hoteldellunaserver.herokuapp.com/' : ''

const baseURL = "https://hoteldelluna-server.herokuapp.com"; //change after
// const baseURL = "http://localhost:5000" //change after

const api = axios.create({baseURL: baseURL})

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