import React from 'react';
import Routes from './Routes.js';
import {Route, withRouter, Switch, BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 


  return (
    <div className="App">
      <Router>
        <Routes/>
      </Router>
      
    </div>
  );
}

export default App;
