import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './scss/style.scss'
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
        <div className="App">
            <Navbar />
            <div className="container-fluid p-0">
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route> 
                    <Route exact path='/about'></Route> 
                    <Route exact path='/rooms'></Route> 
                    <Route exact path='/book'></Route> 
                    <Route exact path='/contact-us'></Route> 
                </Switch>
            </div>
        </div>
    </Router>
    );
}

export default App;
