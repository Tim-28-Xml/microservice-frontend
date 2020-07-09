import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';
import RenderRequests from './RenderRequests'
import '../css/UserProfile.css'
import RenderReportsUser from './RenderReportsUser'

class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            requests: []
        }

    }


    render(){
        return(
            <div className="userProfileDiv">  
                <div className="renderReqs">
                    <h3 className="legendReqs">You can view your rent requests based on their status here. You have 12h to pay online for 
                     reserved requests.</h3>
                    <RenderRequests/>
                </div>
                <div className="renderAdditional">
                    <h3 className="additionalPay">You can pay for kilometers over the limit that you made here. 
                    You cannot order another car before you pay for these.</h3>
                    <RenderReportsUser />
                </div>
       
            </div>
        )
    }
}

export default UserProfile