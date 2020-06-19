import React from 'react'
import { Modal, Button, Card, Form } from "react-bootstrap";
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

    renderCartAds(owner){
        if(this.state.ads !== null){
            let adsToRender = this.state.ads.filter(ad => ad.username === owner);

            return adsToRender.map((ad, index) => {

                let username = localStorage.getItem('username');
                let dateInfo = ad.cartAdDates.filter(el => el.username === username);
                console.log(dateInfo)
                
                return(
                    <Card key={ad.carDTO.id} className="cardContainerCart">

                    <Card.Body className = "cardBodyCart">

                        <Card.Title className="cardTitleCart" style={{textAlign:"center"}}>{ad.carDTO.brand} {ad.carDTO.model}
                        <button onClick={this.removeAd.bind(this,ad.id)} variant="outline-dark" className="removeBtnCart" title="Remove from cart" >x</button>
                        </Card.Title>    
                        {dateInfo[0].dateRange.startDate} - {dateInfo[0].dateRange.endDate}
                    </Card.Body>
                </Card>
                )
                
            })    
        }
    }

    renderAdDivs(){
        let owners = [];
        this.state.ads.forEach(ad => owners.push(ad.username));
        owners = [...new Set(owners)];

        return owners.map(o => 
            <div className="modalBodyCart" style={{background: "rgba(142, 213, 250,0.1)",padding:'5px'}}>
                <Form>
                    <Card.Header>
                        <h5>Owner: {o}</h5>
                    </Card.Header>
                    <div style={{margin: "2%"}}>             
                        {this.renderCartAds(o)}
                    </div>
                    <Card.Text className='cardText' style={{padding:'3px', cursor: 'pointer'}} >
                        <Button variant="outline-info" type="submit"  style={{marginRight:"3%"}}>Create request</Button>                          
                    </Card.Text>      
                </Form>
                <hr/>
            </div>
        );
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
                 scrollable
                
                >
                    <Modal.Header style={{background: "rgba(142, 213, 250,0.1)",textAlign:'center'}}>
                           <h1 style={{color:'#1C78C0'}}>Shopping basket</h1> 
                    </Modal.Header>

                   
                {this.renderAdDivs()}


                </Modal>
            </div>
        )

    }
    

}
export default ShoppingBasket