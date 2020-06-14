// import React from 'react';
// import Sidebar from './helpers/Sidebar'
// import DashboardHome from './helpers/DashboardHome';
// import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
// import DashboardBookings from './helpers/DashboardBookings';
// import DashboardRoomTypes from './helpers/DashboardRoomTypes';
// import DashboardEditBooking from './helpers/DashboardEditBooking'

const Dashboard = () => {

    
    return(
        <div className="container-fluid dashboard">
            <div className="row dashboard__contents">
                <Router>
                    <Sidebar />
                    <Switch>
                        <Route exact path='/dashboard' component={DashboardHome} />
                        <Route exact path='/dashboard/bookings' component={DashboardBookings} />
                        <Route exact path='/dashboard/bookings/edit' component={DashboardEditBooking} />
                        <Route path='/dashboard/roomtypes' component={DashboardRoomTypes} />
                    </Switch>
                </Router>
            </div>  
        </div>
    )
}

export default Dashboard;