import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './scss/style.scss'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
        </Router>
    </div>
  );
}

export default App;
