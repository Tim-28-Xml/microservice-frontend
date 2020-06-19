import React from 'react'
import { Modal, Button, Card } from "react-bootstrap";
import sendmsg from '../icons/postal.svg'
import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'

class NewMessage  extends React.Component{
    constructor(props) {
        super(props);
    

    this.state ={
        message: [],
        people: [],
        show: false,
        receiver:'',
        content:'',
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);


}

handleChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value});
}


componentDidMount(){
    this.getPeople();
}

getPeople() {
    let token = localStorage.getItem('token');

    const options = {
        headers: { 'Authorization': 'Bearer ' + token }
    };

    axios.get(`${serviceConfig.baseURL}/rentrequestservice/api/peoplechat`, options).then(
        (resp) => {
        
            this.setState({ people: resp.data });
            console.log(this.state.people)        

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


renderPeopleSelect(){
    return this.state.people.map((name, index) => {        
        return (
            <div style={{display: 'flex', flexDirection:'row', fontFamily: 'Calibri'}}>
                <h5>Send to: </h5>
                <select style={{width: '50%', marginLeft: '15px'}} name="receiver" onChange={this.handleChange} required>
                <option disabled selected value> -- choose receiver -- </option>
                    <option>{name}</option>
                </select>
            </div>
        )
        })
}

sendMessage(){

    if(this.state.receiver === "" || this.state.content === ""){
        store.addNotification({
            title: "Cannot send!",
            message: "You must choose a person and write something to send a message.",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                pauseOnHover: true
              },
            
          })
    } else {

        let token = localStorage.getItem('token');
        let obj = { content: this.state.content, receiver: this.state.receiver }

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.post(`${serviceConfig.baseURL}/chatservice/api`, obj, options).then(
            (resp) => {
            
                store.addNotification({
                    title: "Sent!",
                    message: "Message is sent successfully.",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 1000,
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
        
            <img src={sendmsg} title="New message" style={{height: '60px', width: 'auto', marginLeft: '30%'}} className="basketIcon" onClick={this.handleShow}>
                
            </img>

            <Modal 
             show={this.state.show}
             onHide={this.handleClose}
             aria-labelledby="contained-modal-title-vcenter"
             centered = "true"
             style={{textAlign:'center'}}
            
            >
                <Modal.Header style={{background: "rgba(142, 213, 250,0.1)",textAlign:'center'}}>
                       <h1 style={{color:'#1C78C0'}}>New message</h1> 
                </Modal.Header>

               
            <Modal.Body className="modalBodyCart" style={{background: "rgba(142, 213, 250,0.1)",padding:'5px'}}>
            <div style={{margin: "2%"}}>             
               {this.renderPeopleSelect()}
            </div>   
            <div>
                <textarea onChange={this.handleChange} name="content" rows="8" cols="55"  className="textfieldmsg" style={{marginLeft: '-10px'}} />
            </div>
            </Modal.Body>
            <Modal.Footer style={{background: "rgba(142, 213, 250,0.1)",padding:'5px'}}>
                <Button variant = "outline-primary" onClick={this.sendMessage.bind(this)} >Send</Button>
            </Modal.Footer>


            </Modal>
        </div>
    )

}




}
export default NewMessage