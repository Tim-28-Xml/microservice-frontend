import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';
import '../css/Messages.css'
import sendmsg from '../icons/postal.svg'
import Chat from './Chat'
import NewMessage from './NewMessage'
import Header from './Header'

class Messages extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            messages: [],
            people: [],
            activeUser: '',
            msg: 0,
        }

    }

    componentDidMount(){
        this.getPeople();
        this.getMsg();
    }

    getPeople() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/chatservice/api/people`, options).then(
            (resp) => {
            
                this.setState({ people: resp.data });        

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

    sort(content){
        content.sort(function(ad1, ad2){
            var nameA = ad1.toUpperCase();
            var nameB = ad2.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;

        })
        this.setState({ people: content });
    }

    getMsg(){
        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){

            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/chatservice/api/new`, options).then(
                    (response) => { this.setState({msg: response.data}) 
                                    console.log(this.state.msg)},
                    (response) => { alert("error") }
            );
    }

    }


chatClick(name){
    this.setState({activeUser: name});

    if(this.state.msg !== 0){
        this.setState({hdr: true});
        let token = localStorage.getItem('token');
        let username = name;

        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
         };

        axios.get(`${serviceConfig.baseURL}/chatservice/api/read/${username}`, options).then(
                (response) => { this.setState({msg: response.data }) },
                (response) => { alert("error") }
            );
    
    }


}



    renderPeople(){
        return this.state.people.map((name, index) => {        
            return (
                <div>
                    <button onClick={this.chatClick.bind(this, name)} className="nameBtnMsg">{name}</button>
                    <br/>
                </div>
            )
            })
    }



    render(){
        return(
            <div>  
                <Header read={this.state.msg}/>
                <div className="messages">
                    <div className="btnsMsg">
                        <NewMessage />

                        <div className="contentDiv">
                            <label className="inboxTitle">Inbox</label>
                            {this.renderPeople()}
                        </div>
                    </div>
                    <div className="contentMsg">
                        {   
                            this.state.activeUser !== '' &&
                            <div className="msngr">
                            <Chat username={this.state.activeUser}/>
                            </div>
                        }
                        {
                            this.state.activeUser === '' &&
                            <h4 className="chatLegend">You can open chat with person by clicking on his/her name in inbox. </h4>
                        }
                    </div>
                    
                </div>
       
            </div>
        )
    }
}

export default Messages