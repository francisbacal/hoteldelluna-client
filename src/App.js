import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './scss/style.scss'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Book from './components/Book';
import Login from './components/Login';

function App() {
  return (
    <Router>
        <div className="App">
            <Navbar />
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
            </Switch>
        </div>
    </Router>
    );
}

export default App;
