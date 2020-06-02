import React from 'react'
import { Modal, Button, Card } from "react-bootstrap";
import axios from 'axios';
import Header from '../components/Header.js';
import agent from '../icons/support.svg'
import user from '../icons/teamwork.svg'
import exit from '../icons/minus.svg';


class RegistrationRolePage  extends React.Component{
    constructor(props) {
        super(props);

        this.state ={}

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        
       
    }

    goToRegisterUserPage(){
        window.location.href="https://localhost:3000/registeruser";
    }

    goToRegisterAgentPage(){
        window.location.href="https://localhost:3000/registeragent";
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    

    render() {
        return (
            <div>
                

                <Button variant="outline-light" style={{marginLeft:'7%',color:'gray'}} onClick={this.handleShow}>
                    Register
                </Button>

                <Modal 
                 show={this.state.show}
                 onHide={this.handleClose}
                 aria-labelledby="contained-modal-title-vcenter"
                 centered = "true"
                 style={{textAlign:'center'}}
                
                >
                    <Modal.Header style={{background: "rgba(142, 213, 250,0.1)",textAlign:'center'}}>
                           <h1 style={{color:'#1C78C0'}}>Choose your role</h1> 
                           <Button variant="outline-light" style={{float: "right",marginTop:'1%',marginBottom:'1%',marginRight:'1%', width: "8%"}} onClick={this.handleClose}>
                  <img style={{height:'25px',width:'25px'}} src={exit}></img>
                </Button>
                    </Modal.Header>

                   
                <Modal.Body style={{background: "rgba(142, 213, 250,0.1)",padding:'5px'}}>

                       

                        <Button  onClick={this.goToRegisterAgentPage.bind(this)}  variant="outline-primary" style={{marginTop:'3%',width:'400px'}} >Register as business/agent <img src={agent} style={{height:'100px',width:'100px'}}></img></Button>
                            <br/>
                            <Button  variant="outline-primary" onClick={this.goToRegisterUserPage.bind(this)}  style={{marginTop:'5%',marginBottom:'5%',width:'400px'}}>Register as user <img src={user} style={{height:'100px',width:'100px'}}></img></Button>


                       
                        <br/>
                        

                

                </Modal.Body>


                </Modal>
            </div>
        )

    }





}

export default RegistrationRolePage
