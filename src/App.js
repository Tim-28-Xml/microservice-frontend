import React from 'react';
import Routes from './Routes.js';
import {Route, withRouter, Switch, BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'

function App() {
 


  return (
    <div className="App">
      <ReactNotification />
      <Router>
        <Routes/>
      </Router>
      
    </div>
  );
}

export default App;
