import React,{useState} from 'react';
import {Card,Form,Button} from 'react-bootstrap';
import {serviceConfig} from '../appSettings.js'
import axios from 'axios';
import { store } from 'react-notifications-component';

const UserInfo = ({loggedInUser,permissions=[]}) =>{

    const [agent,setAgent] = useState({password:'',email:'',name:'',address:'',mbr:''})
    const [endUser,setEndUser] = useState({password:'',email:'',firstname:'',lastname:''})
    const [admin,setAdmin] = useState({password:'',email:''})

    const Login = () =>{
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.post(`${serviceConfig.baseURL}/authenticationservice/api/auth/login`,this.state).then(
            (resp) => {
                const options = {
                    headers: { 'token': resp.data.accessToken}
                };

                window.location.reload();

            }).catch((error) => {
                
                    store.addNotification({
                        title: "Error",
                        message: "Error updating profile please try again!",
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            pauseOnHover: true
                        }

                    })
                });
    }

    return(
        <Card>
            <Card.Title>My info</Card.Title>
            <Card.Body>
                <Form onSubmit={Login}>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Repeated password</Form.Label>
                    <Form.Control type="password"  />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>

                { permissions.includes('ROLE_USER') &&
                <div>
                    <Form.Group >
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                        <Form.Group >
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                </div>
                }
                { permissions.includes('ROLE_AGENT') &&
                <div>
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mbr</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </div>
                }
                <Button varian="outline-dark" type="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>
    );

}
export default (UserInfo);