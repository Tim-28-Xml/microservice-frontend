import React, { Component } from 'react'
import { Modal, Button, Card, Carousel } from "react-bootstrap";
import axios from 'axios';
import Header from '../components/Header.js';
import car1 from '../icons/slika1.jpeg';
import car2 from '../icons/slika2.jpeg';
import comments from '../icons/review (1).svg'
import { serviceConfig } from '../appSettings.js'
import '../css/SingleAdPage.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import cart from '../icons/cart.svg'
import { store } from 'react-notifications-component';


const localizer = momentLocalizer(moment)


class SingleAdPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            car: '',
            userid: '',
            creator: '',
            myEventsList:[],
            permissions: [],


        }




    }

    componentWillMount() {
        this.getAd();
        this.getRole();
    }

    getAd() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/adservice/api/ads/one/${this.props.match.params.id}`).then(
            (resp) => {

                this.setState({
                    car: resp.data.carDTO,
                    userid: resp.data.userId,
                })

                axios.get(`${serviceConfig.baseURL}/authenticationservice/api/auth/one/${resp.data.userId}`, options).then(
                    (resp) => {
                        console.log(resp.data);

                        this.setState({
                            creator: resp.data.username,
                        })

                    },
                    (resp) => { alert('error user ') }
                );




            },
            (resp) => { alert('error add') }
        );

        console.log(this.state);



    }

    getUser() {

        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        alert(this.state.userid);



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
        console.log(resp);

        var permissons = [];

        resp.data.forEach(element => {
            permissons.push(element.authority);
        });


        this.setState({
            isLoggedIn: true,
            permissions: permissons,
         })
    }


    renderPhotos() {
        /*<Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={car2}
                                    alt="Third slide"
                                    style={{height:'500px',width:'300px'}}
                                />


                            </Carousel.Item>*/
    }

    addToCart(id){
        let token = localStorage.getItem('token');
        let self = this;
        let ad = JSON.stringify({ adId: id })

        if(token !== null){
  
            const options = {
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };

            axios.post(`${serviceConfig.baseURL}/adservice/shoppingcart`, ad, options).then(
                    (response) => { console.log('success') },
                    (response) => { console.log('error') }
            );
        }
    }




    render() {


        return (

            <div>
                <Header />


                <Card style={{ backgroundColor: 'rgba(245,245,245,0.8)', width: '45%', height: '30%', marginLeft: '3%', marginTop: '6%'}}>
                    <Card.Title style={{ padding: '10px', textAlign: 'center', fontSize: '30px' }}>
                    {
                        this.state.permissions.includes('ORDER') &&
                        <img src={cart} className="imgCartAdView" title="Add to shopping cart" onClick={this.addToCart.bind(this,this.state.ad)}></img>
                    }
                    {this.state.car.brand} {this.state.car.model}
                </Card.Title>

                    <Card.Body>


                        <Card.Text>

                            <div className="middleAdPart">

                                <div className="leftAdPart">
                                    <div className="leftTitle">
                                        <p>Class:</p>
                                        <p>Fuel type:</p>
                                        <p>Transmission</p>
                                        <p>Kilometers traveled:</p>
                                        <p>Kilometers limit:</p>
                                        <p>Number of child seats:</p>
                                        <p>Owner:</p>
                                        <p>Price</p>

                                        {
                                            this.state.car.cdw &&
                                            <p>Collision damage waiver </p>
                                        }
                                        {
                                            !this.state.car.cdw &&
                                            <p style={{ textDecoration: 'line-through' }}>Collision damage waiver </p>
                                        }
                                    </div>
                                    <div style={{marginTop:'9px'}}>



                                        <p>{this.state.car.carClass}</p>
                                        <p>{this.state.car.fuel}</p>
                                        <p>{this.state.car.transmission}</p>
                                        <p style={{marginTop:'33px'}}>{this.state.car.km}</p>
                                        <p style={{marginTop:'20px'}}>{this.state.car.kmLimit}</p>
                                        <p style={{marginTop:'43px'}}>{this.state.car.childSeats}</p>
                                        <p style={{marginTop:'20px'}}>{this.state.creator}</p>


                                    </div>
                                </div>




                            </div>

                            <div>

                                <Calendar
                                    localizer={localizer}
                                    events={this.state.myEventsList}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 300 ,width: '650px',marginLeft:'0px',marginTop:'27px',backgroundColor:'rgba(255,255,255,0.5'}}
                                />

                            </div>

                        </Card.Text>
                    </Card.Body>

                </Card>

                <div style={{ marginLeft: "53%", marginTop: '-55.5%' ,height:'30%', backgroundColor:'white',width:'40%'}}>



                    <Carousel>

                    <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={car2}
                                    alt="Third slide"
                                    style={{height:'400px',width:'300px'}}
                                />


                            </Carousel.Item>
    

                    </Carousel>


                </div>

                <div style={{ marginLeft: "53%", marginTop: '5%' , backgroundColor:'white',width:'40%',borderStyle:'solid',borderWidth:'1px'}}>

                <div style={{ marginTop: '10px', marginBottom: '10px', padding: '15px' }}>
                        <img src={comments} style={{ height: '50px', width: '50px' }}></img>
                        <h2>REVIEWS &amp; RATINGS</h2>
                    </div>

                </div>




            </div>
        )

    }





}

export default SingleAdPage
