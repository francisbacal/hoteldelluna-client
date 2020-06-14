import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import './scss/style.scss'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Book from './components/Book';
import Login from './components/Login';
// import Dashboard from './components/Dashboard';
import DashboardAdmin from './components/DashboardAdmin';
import PrivateRoute from './components/PrivateRoute';
import {loginResponseState} from './atoms/UserState';
import Unauthorized from './components/errorPages/Unauthorized';
import { useRecoilState } from 'recoil';
import history from './components/history'


function App() {
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState);

    const handleLogout = (e) => {
        e.preventDefault();
        setLoginResponse({
            ...loginResponse,
            isLoggedin: false
        })
        
    }
  return (
    <Router history={history}>
        <div className="App">
            <Navbar />
            {/* <Sidebar /> */}
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/book'>
                    <Book />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route path="/dashboard" isLoggedIn={loginResponse.isLoggedIn} handleLogout={handleLogout} component={DashboardAdmin} />
                <Route exact path='/unauthorized' component={Unauthorized} />
            </Switch>
        </div>
    </Router>
    );
}

export default App;
