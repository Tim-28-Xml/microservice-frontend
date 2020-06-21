import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import React from 'react'
import { Modal, Button, Card, Form } from "react-bootstrap";

class SecureCancelModal  extends React.Component{
    constructor(props) {
        super(props);
    

    this.state ={
        show: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    declineRequest(){
        let token = localStorage.getItem('token');
        let obj = { reqId: this.props.request }

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.post(`${serviceConfig.baseURL}/rentrequestservice/api/decline`,obj, options).then(
            (resp) => {

                store.addNotification({
                    title: "Declined!",
                    message: "The request is declined successfully.",
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
                        window.location.reload();
                      }
                    
                  })

            },
            (resp) => { 
                store.addNotification({
                    title: "Error",
                    message: "Something gone wrong!",
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



    render() {
        return (
            <div>
                

                <Button variant = "outline-dark" onClick={this.handleShow} style={{float: 'right', marginTop:'-40px'}}>
                    Cancel request</Button>
                    
                <Modal 
                 show={this.state.show}
                 onHide={this.handleClose}
                 aria-labelledby="contained-modal-title-vcenter"
                 centered = "true"
                 style={{textAlign:'center'}}
                 scrollable
                
                >
                    <Modal.Body style={{padding: '5%', fontFamily: 'Calibri'}} >
                        <h3 style={{marginBottom: '30px'}}>Are you sure that you want to cancel this request?</h3>
                        <Button variant="success" onClick={this.declineRequest.bind(this)} style={{marginRight: '20px'}}>Yes</Button>
                        <Button variant="danger" onClick={this.handleClose} style={{marginLeft: '20px'}}>No</Button>
                    </Modal.Body>

                   
             


                </Modal>
            </div>
        )

    }
    


}

export default SecureCancelModal