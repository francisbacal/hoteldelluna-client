import React from 'react';
import SidebarCustomer from './helpers/SidebarCustomer'
import history from './history'
import { Switch, Route, Router } from 'react-router-dom';
import LoadingSpinner from './helpers/LoadingSpinner';
import DashboardCustomerHome from './helpers/DashboardCustomerHome';
import DashboardCustomerBookings from './helpers/DashboardCustomerBookings';
import DashboardEditCustomerBooking from './helpers/DashboardEditCustomerBooking'
import NotFound from './errorPages/NotFound';
import TransitionComponent from './TransitionComponent';

const DashboardCustomer = () => {

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
                    <SidebarCustomer />
                    <Switch>
                        <Route exact path='/dashboard' component={DashboardCustomerHome} />
                        <Route exact path='/dashboard/bookings' component={DashboardCustomerBookings} />
                        <Route path='/dashboard/customer-bookings/:id' component={DashboardEditCustomerBooking} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>  
        </div>
    )
}

export default DashboardCustomer;