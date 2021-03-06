import React from 'react';
import Sidebar from './helpers/Sidebar'
import history from './history'
import { Switch, Route, Router } from 'react-router-dom';
import LoadingSpinner from './helpers/LoadingSpinner';
import DashboardHome from './helpers/DashboardHome';
import DashboardBookings from './helpers/DashboardBookings';
import DashboardRoomTypes from './helpers/DashboardRoomTypes';
import DashboardEditBooking from './helpers/DashboardEditBooking'
import DashboardAddType from './helpers/DashboardAddType';
import DashboardEditType from './helpers/DashboardEditType';
import DashboardRooms from './helpers/DashboardRooms';
import DashboardAddRoom from './helpers/DashboardAddRoom';
import DashboardEditRoom from './helpers/DashboardEditRoom';
import NotFound from './errorPages/NotFound';
import TransitionComponent from './TransitionComponent'

const DashboardAdmin = () => {

    const fallback = () => {
        return(
            <div className="container hero">
                <div className="row justify-content-center align-items-center mt-5">
                    <LoadingSpinner className="mt-5"/>
                </div>
            </div>
        )
    }

    return(
        <div className="container-fluid dashboard">
            <TransitionComponent />
            <div className="row dashboard__contents">
                <Router history={history}>
                    <Sidebar />
                    <Switch>
                        <Route exact path='/dashboard' component={DashboardHome} />
                        <Route exact path='/dashboard/bookings' component={DashboardBookings} />
                        <Route exact path='/dashboard/rooms' component={DashboardRooms} />
                        <Route path='/dashboard/rooms/add' component={DashboardAddRoom} />
                        <Route exact path='/dashboard/roomtypes' component={DashboardRoomTypes} />
                        <Route path='/dashboard/roomtypes/add' component={DashboardAddType} />
                        <Route path='/dashboard/rooms/:id' component={DashboardEditRoom} />
                        <Route path='/dashboard/bookings/:id' component={DashboardEditBooking} />
                        <React.Suspense fallback={fallback()}>
                            <Route path='/dashboard/roomtypes/:id' component={DashboardEditType} />
                        </React.Suspense>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>  
        </div>
    )
}

export default DashboardAdmin;