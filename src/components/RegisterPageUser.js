import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Card } from "react-bootstrap";
import '../css/RegisterPageUser.css'
import axios from 'axios'
import Header from '../components/Header.js';
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component'

class RegisterPageUser extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.SendRegisterRequest = this.SendRegisterRequest.bind(this);

        this.state = {
            show: false,

            email: '',
            password: '',
            username: '',

            firstname: '',
            lastname: '',

            repeatedPassword: '',


        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }



    SendRegisterRequest(e) {
        e.preventDefault();

        if(this.state.username.includes("<") || this.state.username.includes(">")) {
            return alert("attack not supported :D");
        }

        if(this.state.email.includes("<") || this.state.email.includes(">")) {
            return alert("attack not supported :D");
        }

        if(this.state.firstname.includes("<") || this.state.firstname.includes(">")) {
            return alert("attack not supported :D");
        }

        if(this.state.lastname.includes("<") || this.state.lastname.includes(">")) {
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

            axios.post(`${serviceConfig.baseURL}/authenticationservice/api/auth/register/user`,this.state).then(
                (resp) => { 
                    store.addNotification({
                        title: "Successfully created request for registration!",
                        message: "Check your email soon.",
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
                <Header></Header>

                <Card
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                    style={{height:'auto',width:'50%',marginTop:'3%',marginLeft:'25%',marginBottom:'2%',backgroundColor:'rgba(142, 213, 250,0.3)'}}
                >
            <Card.Title style={{padding:'10px'}}>
                <h2 className="regAtitle">User registration</h2>
            </Card.Title>

            <Card.Body >

            <Form className="formReg" onSubmit={this.SendRegisterRequest}>

                <Form.Group as={Col}>
                    <Form.Label className="labelRegA">First Name</Form.Label>
                    <Form.Control type="text" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter first name" id="firstname" name="firstname" onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="labelRegA">Last Name</Form.Label>
                    <Form.Control  type="text" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter last name" id="lastname" name="lastname" onChange={this.handleChange} required/>
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

export default RegisterPageUser;