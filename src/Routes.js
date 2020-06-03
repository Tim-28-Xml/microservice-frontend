import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import Header from './components/Header.js'
import HomePage from './components/HomePage.js'
import SingleAdPage from './components/SingleAdPage.js';
import LoginPage from './components/LoginPage.js';
import RegisterPageUser from './components/RegisterPageUser.js';
import RegistrationRolePage from './components/RegistrationRolePage.js';
import RegisterPageAgent from './components/RegisterPageAgent.js';



class Routes extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Switch>
                <Route exact path='/' render={props =>
                    <div>
                        <Header />
                        <HomePage />
                    </div>
                
                    } />

            <Route path='/ad/:id'  component = {SingleAdPage}/>
            <Route path="/login"  component={LoginPage}></Route>
            <Route path="/registeruser"  component={RegisterPageUser}></Route>
            <Route path="/registrationrole" component={RegistrationRolePage}></Route>
            <Route path="/registeragent" component={RegisterPageAgent}></Route>
            </Switch>
        );
    }
}

export default withRouter(Routes);