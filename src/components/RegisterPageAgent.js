import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Card } from "react-bootstrap";
import '../css/RegisterPageAgent.css'
import axios from 'axios';
import Header from '../components/Header.js';
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component'

class RegisterPageAgent extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.SendRegisterRequest = this.SendRegisterRequest.bind(this);
        
        this.state = {
            show: false,

            email: '',
            password: '',
            username: '',

            mbr: 0,
            name: '',
            address: '',

            repeatedPassword: '',


        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    SendRegisterRequest(e) {
        e.preventDefault();

        if(this.state.email.includes("<") || this.state.email.includes(">")) {
            return alert("attack not supported :D");
        }

        if(this.state.name.includes("<") || this.state.name.includes(">")) {
            return alert("attack not supported :D");
        }

        if(this.state.address.includes("<") || this.state.address.includes(">")) {
            return alert("attack not supported :D");
        }

        if(this.state.username.includes("<") || this.state.username.includes(">")) {
            return alert("attack not supported :D");
        }





        if(this.state.password.length < 10){

            store.addNotification({
                title: "Password is not long enough!",
                message: "It must contain 10 characters minimum.",
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

        } else if(this.state.password != this.state.repeatedPassword){

            store.addNotification({
                title: "",
                message: "Repeated password does not match.",
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
        } else {

            axios.post(`${serviceConfig.baseURL}/authenticationservice/api/auth/register/agent`,this.state).then(
                (resp) => { 
                    store.addNotification({
                        title: "Success!",
                        message: "Agent profile is created.",
                        type: "success",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            pauseOnHover: true
                          },
                          onRemoval: (id, removedBy) => {
                            window.location.href = "https://localhost:3000/"
                          }
                        
                      })
                 },
                (resp) => {             
                
                        if(resp.response.data != null){
                        store.addNotification({
                            title: "",
                            message: resp.response.data,
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
                        } else {
                            store.addNotification({
                                title: "Error",
                                message: "Something went wrong",
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
                        }
                    }
            );

        }
    }

   

    render(){
        return(
            <div>

            <Header/>
            
                <Card style={{height:'auto',width:'50%',marginTop:'3%',marginLeft:'25%',marginBottom:'2%',backgroundColor:'rgba(142, 213, 250,0.3)'}}>
            <Card.Title style={{padding:'10px', fontFamily: 'Gill Sans,Gill Sans MT, Calibri, Trebuchet MS,sans-serif',fontSize: '21px',fontWeight: '350'}}>
                <h2 className="regAtitle">Business/agent registration</h2>
            </Card.Title>

            <Card.Body>

            <Form className="formReg" onSubmit={this.SendRegisterRequest}>
                
                <Form.Row>
                    <Form.Group as={Col} className="formRowRegL">
                    <Form.Label className="labelRegA">Name</Form.Label>
                    <Form.Control type="text" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter business/agent name" id="name" name="name" onChange={this.handleChange} required/>
                    </Form.Group>

                    <Form.Group as={Col} className="formRowRegR">
                    <Form.Label className="labelRegA">Business ID</Form.Label>
                    <Form.Control  type="number" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter ID number" id="mbr" name="mbr" onChange={this.handleChange} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Col}>
                <Form.Label className="labelRegA">Address</Form.Label>
                <Form.Control type="text" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter address" id="address" name="address" onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label className="labelRegA">Email</Form.Label>
                <Form.Control type="email" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter email" id="email" name="email" onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="labelRegA">Username:</Form.Label>
                    <Form.Control type="text" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter username" id="username" name="username" onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Row >
                    <Form.Group as={Col} className="formRowRegL">
                    <Form.Label className="labelRegA">Password</Form.Label>
                    <Form.Control type="password" style={{background: "rgb(244, 245, 249)"}} placeholder="Password" id="password" name="password" onChange={this.handleChange} required/>
                    <legend className="legendPass">Password must contain 10 characters minimum, at least one uppercase and a lowercase letter and a number.</legend>
                </Form.Group>

                    <Form.Group as={Col} className="formRowRegR">
                    <Form.Label className="labelRegA">Repeat password</Form.Label>
                    <Form.Control type="password" style={{background: "rgb(244, 245, 249)"}} placeholder="Repeat your password" id="repeatedPassword" name="repeatedPassword" onChange={this.handleChange} required/>
                    </Form.Group>
                </Form.Row>

                <Button variant="outline-secondary" style={{float: "right", margin: "2% 2% 1% 0", width: "10%"}} onClick={this.handleClose}>
                    Close
                </Button>

                <Button variant="outline-primary" type="submit" style={{float: "right", margin: "2% 1% 1% 0"}}>
                    Register
                </Button> 
                

                
            </Form>
            </Card.Body>
            </Card>
        </div>

        )
    }
}

export default RegisterPageAgent;