import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import './scss/style.scss'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Book from './components/Book';
import Login from './components/Login';
import DashboardAdmin from './components/DashboardAdmin';
import PrivateRoute from './components/PrivateRoute';
import {loginResponseState} from './atoms/UserState';
import { useRecoilState } from 'recoil';
import history from './components/history';
import Register from './components/Register'
import Unauthorized from './components/errorPages/Unauthorized';
import Page404 from './components/errorPages/Page404';
import NotFound from './components/errorPages/NotFound';



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
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/book' component={Book} />
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/unauthorized' component={Unauthorized} />
                <Route path="/dashboard" component={DashboardAdmin} />
                {/* <PrivateRoute path="/dashboard" isLoggedIn={loginResponse.isLoggedIn} handleLogout={handleLogout} component={DashboardAdmin} /> */}
                <Route path="/404" component={Page404} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
    );
}

export default App;
