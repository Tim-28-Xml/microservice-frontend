import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';
import RenderRequests from './RenderRequests'
import '../css/UserProfile.css'

class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            requests: []
        }

    }


    render(){
        return(
            <div>
                <h3 className="legendReqs">You can view your rent requests based on their status here.</h3>
                
                <div className="renderReqs">
                    <RenderRequests/>
                </div>            
            </div>
        )
    }
}

export default UserProfile