import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';
import RenderRequests from './RenderRequests'

class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            requests: []
        }

    }

    /*
    componentDidMount(){
        this.getPendingRequests();
    }


    getPendingRequests(){
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/user-requests`, options).then(
            (resp) => {
            
                this.setState({
                    requests: resp.data
                })
                console.log(this.state.requests)

            },
            (resp) => { 
                store.addNotification({
                    title: "",
                    message: "Error while loading rent requests!",
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000,
                        pauseOnHover: true
                      },
                    
                  })
             }
        );
    }

*/

    render(){
        return(
            <div>
                <h1>Hello user</h1>
                

                <RenderRequests/>
                
            </div>
        )
    }
}

export default UserProfile