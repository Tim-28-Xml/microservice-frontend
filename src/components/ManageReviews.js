import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal, Card } from "react-bootstrap";
import '../css/LoginPage.css'
import axios from 'axios'
import Header from '../components/Header.js';
import clock from '../icons/clock.svg';
import user from '../icons/location.svg';
import chat from '../icons/speech-bubble.svg';
import title from '../icons/title.svg';
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component';

class ManageReviews extends React.Component{
    constructor(props){

        super(props);    

        this.renderAdCards = this.renderAdCards.bind(this);

        this.state = {
            
                   unapproved_reviews:[],
                   unapproved_reviwes_size:'',
        }
    }

    componentWillMount(){

        let token = localStorage.getItem('token');
            let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/reviewservice/api/review/all-unapproved`, options).then(
                
                (response) => { 

                    console.log('response from unapproved ads');
                    console.log(response.data);

                    const totalProps = Object.keys(response.data).length

                        this.setState({

                            unapproved_reviews_size: totalProps,
                            unapproved_reviews: response.data,
                        });
                    
                    
                },
                (response) => {

                    store.addNotification({
                        title: "",
                        message: "Error while loading unapproved ads!",
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

    declineReview(id){

        
        let token = localStorage.getItem('token');
        let self = this;

        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
     
         axios.delete(`${serviceConfig.baseURL}/reviewservice/api/review/decline/${id}`, options).then(
            (response) => { 

                store.addNotification({
                    title: "",
                    message: "Successfully declined review!",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000,
                        pauseOnHover: true
                      },
                    
                  });

                window.location.reload();    
                
                
            },(response) => {

                store.addNotification({
                    title: "",
                    message: "Error while declining!",
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



    approveReview(r){

        
        let token = localStorage.getItem('token');
        let self = this;

        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
     
         axios.put(`${serviceConfig.baseURL}/reviewservice/api/review/approve`,r, options).then(
            (response) => { 

                store.addNotification({
                    title: "",
                    message: "Successfully approved review!",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000,
                        pauseOnHover: true
                      },
                    
                  });

                window.location.reload();    
                
                
            },(response) => {

                store.addNotification({
                    title: "",
                    message: "Error while approving!",
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


    renderAdCards() {

            console.log(this.state.unapproved_reviews);
            

        return this.state.unapproved_reviews.map((review, index) => {

            
            
            return (
                <Card key={review.id} className="cardContainer" >

                    <Card.Body className = "cardBody">

                        <img src={title} style={{height:'50px',width:'50px',marginTop:'-1%',padding:'5px'}}></img>  {review.title}
                        <br/>
                        <img src={clock} style={{height:'30px',width:'30px',marginTop:'-1%',padding:'7px'}}></img>
                                &nbsp; {review.time.substring(11,review.time.lenght)} 
                               <br/>
                               <img src={user} style={{height:'30px',width:'30px',marginTop:'-1%',padding:'7px'}}></img>
                               &nbsp;
                               {review.creator}
                               <br/>
                               <div style={{marginTop:'5px'}}>
                                   
                                   <img src={chat} style={{height:'30px',width:'30px',marginTop:'-1%',padding:'7px'}}></img>
                                   &nbsp;
                                {review.content}
                                </div>  
                                <br/>
                                <Button variant="outline-danger" onClick={this.declineReview.bind(this,review.id)} >Decline</Button>  
                                <Button variant="outline-primary" onClick={this.approveReview.bind(this,review)} style={{marginLeft:'10%'}}>Accept</Button>  
                    </Card.Body>
                </Card>
            )
        })
    }


    render() {
        
        return (
            <div>
                <Header/>
               <Card style={{marginTop:'10%',width:'80%',marginLeft:'7%',display: 'flex',flexFlow: 'row wrap'}}>
                   {this.renderAdCards()}
               </Card>
            </div>
        )

    }

}

export default ManageReviews;