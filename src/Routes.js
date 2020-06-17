import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import Header from './components/Header.js'
import HomePage from './components/HomePage.js'
import SingleAdPage from './components/SingleAdPage.js';
import LoginPage from './components/LoginPage.js';
import RegisterPageUser from './components/RegisterPageUser.js';
import RegistrationRolePage from './components/RegistrationRolePage.js';
import RegisterPageAgent from './components/RegisterPageAgent.js';
import AdminProfile from './components/AdminProfile'
import ActivatedAccount from './components/ActivatedAccount'
import CreateAd from './components/CreateAd.js';
import Codebook from './components/Codebook'
import PhysicalRent from './components/PhysicalRent'
import UserProfile from './components/UserProfile'
import PendingRequests from './components/PendingRequestsAgent'

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
            <Route path="/register/user"  component={RegisterPageUser}></Route>
            <Route path="/registrationrole" component={RegistrationRolePage}></Route>
            <Route path="/register/agent" component={RegisterPageAgent}></Route>
            <Route path='/profile/admin' render={props =>
                    <div>
                        <Header />
                        <AdminProfile />
                    </div>
                
                    } />
            <Route path='/activated-account' render={props =>
                    <div>
                        <Header />
                        <ActivatedAccount />
                    </div>
                
                    } />
            <Route path='/create-ad' render={props =>
                    <div>
                        <Header />
                        <CreateAd/>
                    </div>
                
                    } />       
                         
            <Route path='/codebook' render={props =>
                <div>
                    <Header />
                    <Codebook />
                </div>
            
            } />
            <Route path='/physical-rent' render={props =>
                <div>
                    <Header />
                    <PhysicalRent/>
                </div>
            
            } />

            <Route path='/profile/user' render={props =>
                <div>
                    <Header />
                    <UserProfile/>
                </div>
            
            } />
            <Route path='/pending/requests' render={props =>
                <div>
                    <Header />
                    <PendingRequests/>
                </div>
            
            } />
            </Switch>
        );
    }
}

export default withRouter(Routes);