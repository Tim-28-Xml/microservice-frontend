import React from 'react';
import {Button,Card,Row,Tab,Col,Nav} from "react-bootstrap"
import axios from 'axios'
import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'
import '../css/RenderRequests.css'

class RenderRequests extends React.Component{
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
        this.getPendingRequests();
    }


    getPendingRequests(){
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/user-requests`, options).then(
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

    renderReqs(){

            return this.state.requests.map((request, index) => {
                
                return(
                    <Card key={request.id} className="cardContainerReqsAll" >

                    <Card.Body className = "cardBodyReqsUserAll">

                        <Card.Title className="cardTitleReq" style={{textAlign:"left"}}> Owner: {request.owner}
                        </Card.Title>

                        {this.renderAdsFromReqs(request)}

                    </Card.Body>
                </Card>
                )
                
            })    
        }

        renderAdsFromReqs(request){
            return request.ads.map((ad, index) => {
                return(
                    <Card key={request.id} className="cardContainerReqsUser" >

                    <Card.Body className = "cardBodyReqsUser">

                        <Card.Title className="cardTitleCart" style={{textAlign:"center"}}>
                        {ad.carDTO.brand} {ad.carDTO.model}
                        </Card.Title>

                        <Card.Text onClick={this.view.bind(this,ad.id)} className='cardText' style={{padding:'3px'}} >

                            <div className="mainDivReq">
                                <div className="firstDivReq">
                                    <label>City: </label>
                                    <label>Class: </label>
                                    <label>Fuel: </label>
                                </div> 
                                <div className="secondDivReq">
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
               <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Reserved</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="third">Paid</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="fourth">Cancelled</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                        {this.renderReqs()}
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        {this.renderReqs()}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                        {this.renderReqs()}
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                        {this.renderReqs()}
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default RenderRequests