// import React from 'react';
import axios from 'axios';
// import api from './../components/init'

const url = "http://localhost:5000"; //change after

export function checkRooms(start, end, guests) {
    return axios.get(`${url}/rooms/${start}/${end}/${guests}`).then(res=> res.data)
}