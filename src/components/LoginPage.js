import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal, Card } from "react-bootstrap";
import '../css/LoginPage.css'
import axios from 'axios'
import Header from '../components/Header.js';

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.Login = this.Login.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            
            username: '',
            password: '',          
        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    Login(e) {
        /*e.preventDefault();

        axios.post(`${serviceConfig.baseURL}/auth/login`,this.state).then(
            (resp) => { 
                let self = this;
                localStorage.setItem('token', resp.data.accessToken)

                const options = {
                    headers: { 'token': resp.data.accessToken}
                };

                window.location.href = "http://localhost:3000/"
                //alert('success') 
            },
            (resp) => { alert('Username or password is incorrect!') }
        );*/

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render(){
        return(
            <div>
                <Header/>
               <Card style={{marginTop:"10%",width:'40%',marginLeft:"30%",backgroundColor:'rgba(142, 213, 250,0.3)'}}>
                <Card.Title style={{padding:'10px'}}>
                    <h2 className="regAtitle">Log in</h2>
                </Card.Title>

                <Card.Body>

                <Form className="formRLogin" onSubmit={this.Login}>

                    <Form.Group as={Col}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter username" id="username" name="username" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" style={{background: "rgb(244, 245, 249)"}} placeholder="Enter password" id="password" name="password" onChange={this.handleChange} />
                    </Form.Group>

                    
                <Button variant="outline-secondary" style={{float: "right", margin: "2% 32% 1% 0", width: "15%"}} onClick={this.handleClose}>
                    Close
                </Button>

                <Button variant="outline-primary" type="submit" style={{ margin: "2% 1% 1% 32%"}}>
                    Log in
                </Button> 


                </Form>
                
                </Card.Body>
                </Card>
            </div>
        )
    }
}

export default LoginPage;