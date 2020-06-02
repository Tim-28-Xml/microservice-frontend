import React from 'react'
import { Modal, Button, Card } from "react-bootstrap";
import caricon from '../icons/carphoto.jpg'
import '../css/RenderAd.css'



class RenderAd extends React.Component{
    constructor(props) {
        super(props);


        this.renderAdCards = this.renderAdCards.bind(this);
    }

      view(id){
        window.location.href= `https://localhost:3000/ad/${id}`


    }


    renderAdCards() {
        return this.props.ads.map((ad, index) => {
            
            return (
                <Card key={ad.id} className="cardContainer" onClick={this.view.bind(this,ad.id)}>
                    <Card.Body className = "cardBody">
                        <Card.Title className="cardTitle" style={{textAlign:"center"}}>{ad.brand} {ad.model}</Card.Title>
                        <Card>
                        <Card.Img src={caricon} style={{height:"auto",width:'200px',position:'center'}}></Card.Img>
                        </Card>
                        <Card.Text className='cardText' style={{padding:'3px'}} >
                               fuel: &nbsp; {ad.fuel}
                               <br/>
                                class: &nbsp; {ad.class}
                                <br/>
                                transmission: &nbsp; {ad.transmission}
                        </Card.Text>       
                    </Card.Body>
                </Card>
            )
        })
    }

    render() {
        return (
            <div className="renderCardsAds">
                {this.renderAdCards()}
            </div>
        )

    }





}

export default RenderAd
