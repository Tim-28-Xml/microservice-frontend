import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Card } from "react-bootstrap";
import '../css/RegisterPageAgent.css'
import axios from 'axios';
import Header from '../components/Header.js';



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
        /*e.preventDefault();

        if(this.state.password.length < 8){

            alert('Password is too short!');
            return;

        } else if(this.state.password != this.state.repeatedPassword){

            alert('Repeated password does not match!');
            return;
        } else {

            axios.post(`${serviceConfig.baseURL}/auth/register/agent`,this.state).then(
                (resp) => { window.location.href = "http://localhost:3000/" },
                (resp) => { alert('error') }
            );

        }*/
    }

   

    render(){
        return(
            <div>

            <Header/>
            
                <Card style={{height:'auto',width:'50%',marginTop:'5%',marginLeft:'25%',backgroundColor:'rgba(142, 213, 250,0.3)'}}>
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
                    <legend className="legendPass">Password should contain 8 characters minimum, at least one number and a special character.</legend>
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