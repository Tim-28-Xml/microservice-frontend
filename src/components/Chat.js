import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';
import moment from 'moment';
import '../css/Chat.css'
import send from '../icons/send.svg'

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            messages: [],
            receiver: '',
            content: ''
        }
        

        this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }
    

    componentDidMount(){
        this.getChat();
        this.scrollToBottom();
        
    }


    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
      }

    componentDidUpdate(prevProps){
        if(prevProps.username !== this.props.username){
            this.getChat();
        }
        this.scrollToBottom();
    }

    getChat(){
        let token = localStorage.getItem('token');
        let username = this.props.username;

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/chatservice/api/${username}`, options).then(
            (resp) => {
            
                this.sortDates(resp.data);     

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


    sortDates(msgs){
        msgs.sort(function(a, b) {
            a = new Date(a.time);
            b = new Date(b.time);
            return a>b ? 1 : a<b ? -1 : 0;
        })

        this.setState({ messages: msgs }); 
        console.log(this.state.messages) 
    }


    sendMessage(){
        
        console.log(this.state.content)
        console.log(this.state.receiver)

        if(this.state.content.includes("<") || this.state.content.includes(">")) {
            return alert("attack not supported :D");
        }


        if(this.props.username === "" || this.state.content === ""){
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
            let obj = { content: this.state.content, receiver: this.props.username }
    
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
    


    renderMessages(){

        return this.state.messages.map((msg, index) => {

            var editedtime = moment(msg.time).format("DD/MM/YYYY HH:mm")
            
            if(msg.sender === this.props.username){
                
                return(
                    <div className = "senderMsgs">
                       <h6>{editedtime} </h6> 
                        <h5>{msg.content}</h5>
                        
                    </div>

                )
            } else {           
            
            return (
                <div className = "myMsgs">
                    <h6 style={{float: 'right'}}>{editedtime}</h6>
                    <br />
                    <h5 style={{float: 'right'}}>{msg.content}</h5>
                
                </div>
            )
            }
    })
}



    render(){
        return(
            <div className = "msngr">
                <h4 className="chatusr">{this.props.username}</h4>
                <div className="renderMsgs">
                    {this.renderMessages()}
                    <div ref={el => { this.el = el; }} />
                </div>

                <div style={{display:'flex', flexDirection: 'row'}}>
                    <textarea rows="3" cols="80" onChange={this.handleChange} name="content"  className="textfieldmsg" />
                    <button title="Send" onClick={this.sendMessage.bind(this)} className="btnSendMsg"><img src={send} style={{height:'40px',width:'auto'}}/></button>
                </div>
            </div>
        )
    }
}

export default Chat