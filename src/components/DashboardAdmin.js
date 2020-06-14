import React from 'react';
import Sidebar from './helpers/Sidebar'
import DashboardHome from './helpers/DashboardHome';
import { Switch, Route, Router } from 'react-router-dom';
import DashboardBookings from './helpers/DashboardBookings';
import DashboardRoomTypes from './helpers/DashboardRoomTypes';
import DashboardEditBooking from './helpers/DashboardEditBooking'
import DashboardAddType from './helpers/DashboardAddType';
import history from './history'

const DashboardAdmin = () => {

    return(
        <div className="container-fluid dashboard">
            <div className="row dashboard__contents">
                <Router history={history}>
                    <Sidebar />
                    <Switch>
                        <Route exact path='/dashboard' component={DashboardHome} />
                        <Route exact path='/dashboard/bookings' component={DashboardBookings} />
                        <Route exact path='/dashboard/bookings/:id' component={DashboardEditBooking} />
                        <Route exact path='/dashboard/roomtypes' component={DashboardRoomTypes} />
                        <Route path='/dashboard/roomtypes/add' component={DashboardAddType} />
                    </Switch>
                </Router>
            </div>  
        </div>
    )
}

export default DashboardAdmin;