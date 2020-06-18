import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal, Card } from "react-bootstrap";
import more from '../icons/download (1).svg';
import clock from '../icons/clock.svg';
import user from '../icons/location.svg';
import chat from '../icons/speech-bubble.svg';


class RenderReviews extends React.Component{

    constructor(props){
        super(props);


        this.state = {
                 
        }
    }

    showContent(review){

        console.log('REVIEW'+review.id);
        console.log( document.getElementsByName(review.id)[0]);

        if(document.getElementsByName(review.id)[0].style.display == "none"){
            
            
            document.getElementsByName(review.id)[0].style.display = "block";
            
            document.getElementsByName(review.id)[0].style.height = "100px";
            
        
        }
        else{
            {document.getElementsByName(review.id)[0].style.display = "none";
            document.getElementsByName(review.id)[0].style.height = "90px";
        
            }
        }
    }


    renderAdCards() {

        return this.props.reviews.map((review, index) => {
            
            
            return (
                <Card key={review.id} style={{marginBottom:'15px'}} >

                    <Card.Body>

                        <Card.Title style={{textAlign:"left"}}> " {review.title}  " </Card.Title>
                    
                        <Card.Text style={{padding:'3px'}} name={review.id} >
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
                        </Card.Text>       
                    </Card.Body>
                </Card>
            )
        })
    }

    render() {
        
        return (
            <div>
                {this.renderAdCards()}
            </div>
        )

    }



}

export default RenderReviews