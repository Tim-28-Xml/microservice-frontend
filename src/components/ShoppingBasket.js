import React from 'react'
import { Modal, Button, Card } from "react-bootstrap";
import basketicon from '../icons/basket.svg'
import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import '../css/ShoppingBasket.css'


class ShoppingBasket  extends React.Component{
    constructor(props) {
        super(props);
    

    this.state ={
        ads: [],
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderCartAds = this.renderCartAds.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };

            axios.get(`${serviceConfig.baseURL}/adservice/shoppingcart`, options).then(
                    (response) => {
                        this.setState({ ads: response.data })
                        console.log(this.state.ads) },
                    (response) => { 
                        store.addNotification({
                            title: "Error",
                            message: "Something went wrong.",
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


    removeAd(adId){
        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 
                    'Authorization': 'Bearer ' + token
                },
            };

            axios.delete(`${serviceConfig.baseURL}/adservice/shoppingcart/${adId}`, options).then(
                    (response) => {
                        store.addNotification({
                            title: "",
                            message: "You have removed this ad from cart.",
                            type: "success",
                            insert: "top",
                            container: "top-center",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                pauseOnHover: true
                              },
                            
                          })
                          window.location.reload();
                        },
                    (response) => { 
                        store.addNotification({
                            title: "Error",
                            message: "Something went wrong.",
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

    createRequest(adId){
        let token = localStorage.getItem('token');
        let self = this;
        let ad = JSON.stringify({ adId: adId })

        if(token !== null){
  
            const options = {
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };

            axios.post(`${serviceConfig.baseURL}/rentrequest/api`, ad, options).then(
                    (response) => {
                        store.addNotification({
                            title: "Rent request is created!",
                            message: "You will get response soon.",
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
                                window.location.href = "https://localhost:3000/"
                            }
                            
                          })

                        },
                    (response) => { 
                        store.addNotification({
                            title: "Error",
                            message: "Something went wrong.",
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


    view(id){
        window.location.href= `https://localhost:3000/ad/${id}`
    }

    renderCartAds(){
        if(this.state.ads !== null){
            return this.state.ads.map((ad, index) => {
                
                return(
                    <Card key={ad.carDTO.id} className="cardContainerCart" >

                    <Card.Body className = "cardBodyCart">

                        <Card.Title className="cardTitleCart" style={{textAlign:"center"}}>{ad.carDTO.brand} {ad.carDTO.model}
                        <button onClick={this.removeAd.bind(this,ad.id)} variant="outline-dark" className="removeBtnCart" title="Remove from cart" >x</button>
                        </Card.Title>

                        <Card.Text onClick={this.view.bind(this,ad.id)} className='cardText' style={{padding:'3px', cursor: 'pointer'}} >
                            <Button onClick={this.createRequest.bind(this,ad.carDTO)} variant="outline-info"  style={{marginRight:"3%"}}>Create request</Button>                          
                        </Card.Text>       
                    </Card.Body>
                </Card>
                )
                
            })    
        }
    }


    render() {
        return (
            <div>
                

                <img src={basketicon} className="basketIcon" onClick={this.handleShow} style={{marginLeft:'-23px'}}>
                    
                </img>

                <Modal 
                 show={this.state.show}
                 onHide={this.handleClose}
                 aria-labelledby="contained-modal-title-vcenter"
                 centered = "true"
                 style={{textAlign:'center'}}
                
                >
                    <Modal.Header style={{background: "rgba(142, 213, 250,0.1)",textAlign:'center'}}>
                           <h1 style={{color:'#1C78C0'}}>Shopping basket</h1> 
                    </Modal.Header>

                   
                <Modal.Body className="modalBodyCart" style={{background: "rgba(142, 213, 250,0.1)",padding:'5px'}}>
                <div style={{margin: "2%"}}>             
                    {this.renderCartAds()}
                </div>   
                </Modal.Body>


                </Modal>
            </div>
        )

    }
    

}
export default ShoppingBasket