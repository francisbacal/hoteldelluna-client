import axios from 'axios';

const baseURL = "http://localhost:5000"; //change after

const api = axios.create({baseURL: baseURL})

export default api