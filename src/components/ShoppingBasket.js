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
                        console.log(this.state)},
                        
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

    sortAdsByOwner(ads){
        ads.sort(function(ad1, ad2){
            var nameA = ad1.username.toUpperCase();
            var nameB = ad2.username.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;

        })
        this.setState({ ads: ads });
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
        
    }


    view(id){
        window.location.href= `https://localhost:3000/ad/${id}`
    }

    handleCheck(e, start, end, prices, owner, cdw){
        let {name, checked} = e.target;
        let priceDiff = 0;
        let totalPrice = isNaN(this.state[owner]) ? 0 : this.state[owner]

        let daysNr =  Math.floor((new Date(end) - new Date(start)) / (1000*60*60*24)) + 1
        
        priceDiff = daysNr * prices.dailyPrice;

        if(cdw)
            priceDiff += prices.cdwPrice;

        
        if(checked)
            totalPrice += priceDiff
        else
            totalPrice -= priceDiff
            
        this.setState({[name]: checked, [owner]: totalPrice});
    }


    handleSubmit(e, owner){
        e.preventDefault();

        let ownerAds = []
        let price = this.state[owner]

        this.state.ads.forEach(ad => {
            if(ad.username === owner)
                ownerAds.push(ad);
        })

        let checkedAds = ownerAds.filter((ad) => this.state[ad.id])

        if(checkedAds.length == 0)
            return;

        let adsWithDates = []
        checkedAds.forEach(ad => {
            let username = localStorage.getItem('username');
            let x = ad.cartAdDates.filter(d => d.username === username);
            x.forEach(el => {
                adsWithDates.push({
                    ad_id: ad.id,
                    start: el.dateRange.startDate,
                    end : el.dateRange.endDate
                })
            })
        })

        let body = {
            owner,
            creationTime: new Date(),
            adsWithDates,
            price
        }   

        this.sendReq(body)

    }

    sendReq(body){
        let token = localStorage.getItem('token');

        if(token !== null){
  
            const options = {
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            };

            axios.post(`${serviceConfig.baseURL}/api/rentrequest`, body, options).then(
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

    



    renderCartAds(owner){
        if(this.state.ads !== null){
            let adsToRender = this.state.ads.filter(ad => ad.username === owner);

            return adsToRender.map((ad, index) => {

                let username = localStorage.getItem('username');
                let dateInfo = ad.cartAdDates.filter(el => el.username === username);
                let startDate = dateInfo[0].dateRange.startDate
                let endDate = dateInfo[0].dateRange.endDate
                
                return(
                    <Card key={ad.carDTO.id} className="cardContainerCart">

                    <Card.Body className = "cardBodyCart">

                        <Card.Title className="cardTitleCart" style={{textAlign:"center"}}>{ad.carDTO.brand} {ad.carDTO.model}
                        <button onClick={this.removeAd.bind(this,ad.id)} className="removeBtnCart" title="Remove from cart" >x</button>
                        <Button onClick={this.view.bind(this,ad.id)} variant="outline-info" style={{float: 'left'}} title="Ad info" >i</Button>

                        </Card.Title>    
                        {startDate} - {endDate}
                        <br/>
                        Price per day: {ad.pricelistDto.dailyPrice}
                        <br/>
                        {ad.carDTO.cdw && <span>Collision damage waiver: {ad.pricelistDto.cdwPrice}</span>}
                        
                    </Card.Body>

                    <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Add" name={ad.id} onChange={(e) => this.handleCheck(e, startDate, endDate, ad.pricelistDto, owner, ad.carDTO.cdw)}/>
                    </Form.Group>
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
                <Form onSubmit={(e) => this.handleSubmit(e, o)}>
                    <Card.Header>
                        <h5>Owner: {o}</h5>
                    </Card.Header>
                    <div style={{margin: "2%"}}>             
                        {this.renderCartAds(o)}
                    </div>
                    { this.state[o] !== 0 &&
                    <Card.Header>
                        Total price : {this.state[o]}
                    </Card.Header>
                    }
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
                    <Modal.Header style={{background: "rgba(142, 213, 250,0.1)",textAlign:'center'}} closeButton>
                           <h1 style={{color:'#1C78C0'}}>Shopping basket</h1> 
                    </Modal.Header>

                   
                {this.renderAdDivs()}


                </Modal>
            </div>
        )

    }
    

}
export default ShoppingBasket