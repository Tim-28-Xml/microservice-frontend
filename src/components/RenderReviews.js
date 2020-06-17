import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal, Card } from "react-bootstrap";
import more from '../icons/expand.svg';
import clock from '../icons/clock.svg';


class RenderReviews extends React.Component{

    constructor(props){
        super(props);


        this.state = {
                 
        }
    }

    showContent(review){

        console.log('REVIEW'+review.id);
        console.log( document.getElementsByName(review.id)[0]);

        if(document.getElementsByName(review.id)[0].style.display == "none")

        {document.getElementsByName(review.id)[0].style.display = "block";}
        else{
            {document.getElementsByName(review.id)[0].style.display = "none";}
        }
    }


    renderAdCards() {

        return this.props.reviews.map((review, index) => {
            
            
            return (
                <Card key={review.id} >

                    <Card.Body>

                        <Card.Title style={{textAlign:"left"}}>{review.title} by {review.creator} <Button style={{width:'100px',height:'40px'}} onClick={this.showContent.bind(this,review)} title="More" variant="outline-light"><img src={more} style={{height:'20px',width:'50px'}}></img></Button></Card.Title>

                        <Card.Text style={{padding:'3px',display:'none'}} name={review.id} >
                                <img src={clock} style={{height:'20px',width:'20px',marginTop:'-1%'}}></img>
                                &nbsp; {review.time.substring(11,review.time.lenght)} 
                               <br/>
                               <div style={{marginTop:'5px'}}>
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