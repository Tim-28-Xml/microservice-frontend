import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';
import RenderRequests from './RenderRequests'
import '../css/PendingRequestsAgent.css'
import moment from 'moment';

class PendingRequestsAgent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            requests: []
        }
    }

    view(id){
        window.location.href= `https://localhost:3000/ad/${id}`
    }

    componentDidMount(){
        this.getRequests();
    }

    getRequests(){ 

        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/agent-requests`, options).then(
            (resp) => {

                this.setState({
                    requests: resp.data
                })

                console.log(this.state.requests)

            },
            (resp) => { 
                store.addNotification({
                    title: "",
                    message: "Error while loading rent requests!",
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

    approveRequest(id){
        let token = localStorage.getItem('token');
        let obj = { reqId: id }

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.post(`${serviceConfig.baseURL}/rentrequestservice/api/approve`,obj, options).then(
            (resp) => {

                store.addNotification({
                    title: "Approved!",
                    message: "The request is approved successfully.",
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


    declineRequest(id){
        let token = localStorage.getItem('token');
        let obj = { reqId: id }

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


    renderReqs(){
        
        return this.state.requests.map((request, index) => {
            if(request.requestStatus === "PENDING"){
                var createdTime = moment(request.creationTime).format("DD/MM/YYYY HH:MM")
            return(
                <Card key={request.id} className="cardContainerReqsAll" >

                <Card.Body className = "cardBodyReqsUserAll">

                    <Card.Title className="cardTitleReq" style={{textAlign:"left"}}> Creator: {request.creator}
                    <br/>
                        Creation time: {createdTime}
                    </Card.Title>

                    {this.renderAdsFromReqs(request)}
                    <div className="divBtnsPending">
                        <Button variant = "outline-success" onClick={this.approveRequest.bind(this,request.id)} style={{marginRight: "15%"}}>Accept</Button>
                        <Button variant = "outline-danger" onClick={this.declineRequest.bind(this,request.id)}>Decline</Button>
                    </div>

                </Card.Body>
            </Card>
            )
            }
            
        })    
    }


    renderAdsFromReqs(request){
        return request.ads.map((ad, index) => {
            var startTime = moment(ad.start).format("DD/MM/YYYY")
            var endTime = moment(ad.end).format("DD/MM/YYYY")
            return(
                <Card key={request.id} className="cardContainerReqsUser" >

                <Card.Body className = "cardBodyReqsUser">

                    <Card.Title className="cardTitleCart" style={{textAlign:"center"}}>
                    {ad.carDTO.brand} {ad.carDTO.model}
                    <Button variant = "outline-light" onClick={this.view.bind(this,ad.id)} style={{float: "left"}} title="Ad info">i</Button>
                    </Card.Title>

                    <Card.Text className='cardText' style={{padding:'3px'}} >

                        <div className="mainDivReq" style={{marginLeft: '20px'}}>
                            <div className="firstDivReq">
                                <label>Start date: </label>
                                <label>End date: </label>
                                <label>City: </label>
                                <label>Class: </label>
                                <label>Fuel: </label>
                                
                            </div> 
                            <div className="secondDivReq">
                                <label>{startTime}</label>
                                <label>{endTime}</label>
                                <label> {ad.city} </label>
                                <label>{ad.carDTO.carClass} </label>
                                <label>{ad.carDTO.fuel} </label>
                            </div>  
                        </div>                 
                    </Card.Text>       
                </Card.Body>
            </Card>
            )
        })
    }


    render(){
        return(
            <div>  
                <h3 className="legendReqs">You have 24h to accept or decline all rent requests created for your ads 
                or they will be automatically cancelled.</h3> 
                <div className="renderingPending">
                    {this.renderReqs()}
                </div>
       
            </div>
        )
    }
}

export default PendingRequestsAgent