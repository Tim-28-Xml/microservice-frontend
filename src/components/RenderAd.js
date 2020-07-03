import React from 'react'
import { Modal, Button, Card } from "react-bootstrap";
import caricon from '../icons/carphoto.jpg'
import '../css/RenderAd.css'
import cart from '../icons/cart.svg'
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import AdCalender from './AdCalender';


class RenderAd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            permissions: [],
            show: false,
            cartAd: {}
        }

        this.renderAdCards = this.renderAdCards.bind(this);
    }

      view(id){
        window.location.href= `https://localhost:3000/ad/${id}`
    }


    componentDidMount(){
        this.getRole();
    }

    getRole(){

        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/authenticationservice/api/auth/role`, options).then(
                    (response) => { self.changeState(response) },
                    (response) => { }
            );
        }

    }

    changeState(resp) {
        //console.log(resp);

        var permissons = [];

        resp.data.forEach(element => {
            permissons.push(element.authority);
        });
        
        
        this.setState({ 
            isLoggedIn: true,
            permissions: permissons,
         })
    }




    renderAdCards() {
        return this.props.ads.map((ad, index) => {
            
            
            return (
                <Card key={ad.id} className="cardContainer" >

                    <Card.Body className = "cardBody">

                        <Card.Title className="cardTitle" style={{textAlign:"left"}}>{ad.carDTO.brand} {ad.carDTO.model}
                            {  this.state.permissions.includes("ORDER") && 
                                <img src={cart} className="imgCart" title="Add to shopping cart" onClick={() => {this.setState({show:true, cartAd:ad})}}></img> 
                            }

                        </Card.Title>

                        <Card onClick={this.view.bind(this,ad.id)} style={{cursor: 'pointer', marginTop:'6%'}}>
                            {this.checkPhoto(ad)}
                        </Card>
                        <Card.Text onClick={this.view.bind(this,ad.id)} className='cardText' style={{padding:'3px', cursor: 'pointer'}} >
                                daily price: &nbsp; {ad.pricelistDto.dailyPrice}€
                                <br />
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
        const {show, cartAd} = this.state;

        return (
            <div className="renderCardsAds">
                {this.renderAdCards()}
                <AdCalender show={show} ad={cartAd} handleClose={() => this.setState({show:false})}/>
            </div>
        )

    }





}

export default RenderAd
