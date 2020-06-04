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
            console.log(ad);
            
            
            return (
                <Card key={ad.id} className="cardContainer" onClick={this.view.bind(this,ad.id)}>
                    <Card.Body className = "cardBody">
                        <Card.Title className="cardTitle" style={{textAlign:"center"}}>{ad.carDTO.brand} {ad.carDTO.model}</Card.Title>
                        <Card>
                            {this.checkPhoto(ad)}
                        </Card>
                        <Card.Text className='cardText' style={{padding:'3px'}} >
                               fuel: &nbsp; {ad.carDTO.fuel}
                               <br/>
                                class: &nbsp; {ad.carDTO.carClass}
                                <br/>
                                transmission: &nbsp; {ad.carDTO.transmission}
                        </Card.Text>       
                    </Card.Body>
                </Card>
            )
        })
    }


    checkPhoto(ad){

        console.log(ad.carDTO.files);
        

        if(ad.carDTO.files.lenght == undefined){

            
            return ( 

            <Card.Img src={caricon} style={{height:"auto",width:'200px',position:'center'}}></Card.Img>
            
            )
        }else{
            return ad.carDTO.files.map((file, index) => {
            
                return (

                    <Card.Img src={file} style={{height:"auto",width:'200px',position:'center'}}></Card.Img>
                    
                )
            })
    }

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
