import React from 'react';
import {loginResponseState} from './../atoms/UserState';
import { Redirect } from 'react-router-dom';
import Sidebar from './helpers/Sidebar'

const Dashboard = () => {

    
    return(
        <div className="container-fluid dashboard">
            <div className="row dashboard__contents">
                <Sidebar />
                <div className="col bg-white">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                            <h1 className='text-warning font-weight-bolder'>Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Dashboard;