import React, {useState} from 'react';
import { FaPlusCircle, FaExternalLinkAlt} from "react-icons/fa";
import { Link } from 'react-router-dom';
import {typeToAddState, refreshState} from './../../atoms/RoomsState'
import { useRecoilState } from 'recoil';
import {addRoomType} from './../../api/rooms'
import history from './../history'
import ErrorMessage from './ErrorMessage';

const DashboardAddType = () => {

    const [typeToAdd, setTypeToAdd] = useRecoilState(typeToAddState)
    const [refreshType, setRefreshType] = useRecoilState(refreshState)
    const [addResponse, setAddResponse] = useState({
        error: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData();

        for (let key in typeToAdd) {
            formData.append(key, typeToAdd[key])
        }

        let response = await addRoomType(formData)

        if(response.data) {
            let error = response.data.error;
            if (error.name) {
                setAddResponse({
                    error: error.name
                })
            } else {
                setAddResponse({
                    error: error
                })
            }
            
        } else {
            setRefreshType({refresh: true})
            history.push('/dashboard/roomTypes')
        }
        

    }

    const handleChange = (e) => {

        let images = [];

        if (e.target.name === 'images') {

            for (let [key,value] of Object.entries(e.target.files)) {
                let obj = {
                    name: value.name
                }

                images.push(obj)
            }
            setTypeToAdd({
                ...typeToAdd,
                images: images
            })

        } else {
            setTypeToAdd({
                ...typeToAdd,
                [e.target.id]: e.target.value
            })
        }
    }
    
    return (
        <div className="col bg-white addType">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Room Types - Add</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                    
            </div>
            <div className="row align-items-center ml-5">
                <div className="col-12 col-md-8 col-lg-4 text-secondary">
                    {addResponse.error ? <ErrorMessage error={addResponse.error} /> : ''}
                    <form onSubmit={handleSubmit}>
                        <div class="form-group w-auto dbBookings__edit">
                            <label for="name">Room Type Name:</label>
                            <input onChange={handleChange} type="text" class="form-control" id="name" />
                        </div>
                        <div class="form-group w-auto dbBookings__edit">
                            <label for="price">Price per night</label>
                            <input onChange={handleChange} type="number" class="form-control" id="price" />
                        </div>
                        <div class="form-group w-auto dbBookings__edit">
                            <label for="description">Description</label>
                            <textarea onChange={handleChange} type="text" class="form-control" rows="5" id="description" />
                        </div>
                        <div className="form-group addType">
                            <label htmlFor="images">Images:</label>
                            <input 
                                onChange={handleChange} 
                                type="file" 
                                className="form-control-file w-100" 
                                id="images" 
                                multiple
                                name="images"
                            >
                            </input>
                        </div>
                        <button className="btn btn-primary">ADD</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DashboardAddType