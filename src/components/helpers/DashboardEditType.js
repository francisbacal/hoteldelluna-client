import React, {useState, useEffect} from 'react';
import {typeToUpdateState, refreshState} from './../../atoms/RoomsState'
import { useRecoilState } from 'recoil';
import history from './../history'
import ErrorMessage from './ErrorMessage';
import { useParams } from 'react-router-dom';
import {getRoomType, updateRoomType} from './../../api/rooms';
import { toggleState } from './../../atoms/sidebarState';
import _ from 'lodash';

const DashboardEditType = () => {
    const [isToggled, setIsToggled] = useRecoilState(toggleState);
    const [typeToUpdate, setTypeToUpdate] = useRecoilState(typeToUpdateState)
    const [refreshType, setRefreshType] = useRecoilState(refreshState)
    const [getTypeResponse, setGetTypeResponse] = useState({
        error: null
    })

    const {id} = useParams();

    useEffect(()=> {

        const setVal = async () => {
            let response = await getRoomType(id)

            if (response.data) {
                if (_.isEmpty(response.data.error)) {
                    setGetTypeResponse({
                        error: 'No Room Type Found'
                    })
                } else {
                    setGetTypeResponse({
                        error: response.data.error
                    })
                }
            } else {
                setTypeToUpdate({
                    name: response.name,
                    price: response.price,
                    description: response.description
                })
            }
        }
    
        setVal()

    },[])



    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData();

        for (let key in typeToUpdate) {
            formData.append(key, typeToUpdate[key])
        }

        let response = await updateRoomType(id, formData)

        if(response.data) {
            let error = response.data.error;
            if (error.name) {
                setGetTypeResponse({
                    error: error.name
                })
            } else {
                setGetTypeResponse({
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
            setTypeToUpdate({
                ...typeToUpdate,
                images: images
            })

        } else {
            setTypeToUpdate({
                ...typeToUpdate,
                [e.target.id]: e.target.value
            })
        }
    }
    
    return (
        <div className={isToggled ? "col bg-white addType dashboard-margin--toggle" : "col bg-white addType dashboard-margin"}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Room Types - Edit</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                    
            </div>
            <div className="row align-items-center">
                <div className="col-12 col-md-8 col-lg-4 text-secondary">
                    {getTypeResponse.error ? <ErrorMessage error={getTypeResponse.error} /> : ''}
                    <form onSubmit={handleSubmit}>
                        <div class="form-group w-auto dbBookings__edit">
                            <label htmlFor="name">Room Type Name:</label>
                            <input onChange={handleChange} type="text" className="form-control" id="name" value={typeToUpdate.name} />
                        </div>
                        <div class="form-group w-auto dbBookings__edit">
                            <label htmlFor="price">Price per night</label>
                            <input onChange={handleChange} type="number" className="form-control" id="price" value={typeToUpdate.price} />
                        </div>
                        <div class="form-group w-auto dbBookings__edit">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={handleChange} type="text" className="form-control" rows="5" id="description" >{typeToUpdate.description}</textarea>
                        </div>
                        {/* <div className="form-group addType">
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
                        </div> */}
                        <button className="btn btn-primary">EDIT</button>
                    </form>
                </div>
                {/* <div className="col-12 colmd-8 col-lg-4 text-secondary">
                    <div className="d-flex">
                        <div className="col-4">
                            <img src=
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default DashboardEditType