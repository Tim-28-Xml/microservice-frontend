import React, { Component } from 'react'
import { Modal, Button, Card, Carousel } from "react-bootstrap";
import axios from 'axios';
import Header from '../components/Header.js';
import car1 from '../icons/slika1.jpeg';
import car2 from '../icons/slika2.jpeg';
import comments from '../icons/rating.svg'
import { serviceConfig } from '../appSettings.js'
import '../css/SingleAdPage.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import cart from '../icons/cart.svg'
import RenderReviews from '../components/RenderReviews.js';
import { store } from 'react-notifications-component';
import AdCalender from './AdCalender';
import ReactStars from "react-rating-stars-component";
const localizer = momentLocalizer(moment)


class SingleAdPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);


        this.state = {

            car: '',
            userid: '',
            creator: '',
            myEventsList:[],
            permissions: [],
            reviews: [],
            user_paid:[],
            contains: false,
            title:'',
            content:'',
            rating:'',
            can_leave_review: false,
            submited_rating:'',
            pricelist: [],


            show: false,
            ad: []
        }




    }

    componentWillMount() {
        this.getAd();
        this.getRole();
        this.getReviews();

    }

    getReviews(){

        let token = localStorage.getItem('token');

        if(token !== null){

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/reviewservice/api/review/by-ad-approved/${this.props.match.params.id}`, options).then(
            (resp) => {

                console.log("REviews: ");
                console.log(resp.data);
                var sum= 0;
                var size=0;

                resp.data.forEach(review => {

                    sum = sum + review.rating;
                    size = size+1;

                });

                var adRating = sum/size;

                this.setState({
                    reviews : resp.data,
                    rating : adRating,
                })

            },
            (resp) => { alert('error reviews ') }
        );

        }



    }

    getAd() {

        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/adservice/api/ads/one/${this.props.match.params.id}`).then(
            (resp) => {
                //console.log(resp.data)
                this.setState({
                    ad: resp.data,
                    pricelist: resp.data.pricelistDto,
                    car: resp.data.carDTO,
                    creator: resp.data.username,
                    
                    
                })
                console.log(this.state)
                
            },
            (resp) => { alert('error add') }
        );

        



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
        //console.log(resp);

        var permissons = [];

        resp.data.forEach(element => {
            permissons.push(element.authority);
        });


        this.setState({
            isLoggedIn: true,
            permissions: permissons,
         })

         this.getUserPaid();
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



    getUserPaid(){

        if(this.state.permissions.includes('ROLE_USER')){

            let token = localStorage.getItem('token');
            let self = this;

            if(token !== null){

                const options = {
                    headers: { 'Authorization': 'Bearer ' + token}
                };

            axios.get(`${serviceConfig.baseURL}/rentrequestservice/api/my-paid-finished`, options).then(
                (response) => {

                    console.log('response from paid');
                    console.log(response.data);


                    this.setState({ user_paid : response.data, });

                    response.data.forEach(paid => {


                            if(paid.ad_id == this.props.match.params.id ){

                                    this.setState({
                                         contains: true,
                                        });
                                        return;
                    }



               });

            },
                (response) => { alert('error')  }
        );



        axios.get(`${serviceConfig.baseURL}/reviewservice/api/review/my-reviews`, options).then(
            (response) => {

                console.log('response from my reviews');

                response.data.forEach(element => {

                    if(element == this.props.match.params.id){

                        this.setState({ can_leave_review : false,
                        });

                    }else {

                        this.setState({ can_leave_review : true,
                        });

                    }

                });



        },
            (response) => { alert('error WITH my reviews')  }
    );




         }
        }
    }

    addToCart(){
        let token = localStorage.getItem('token');
        let ad = JSON.stringify({ adId: this.props.match.params.id })

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

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }





    submitReview(){

        let token = localStorage.getItem('token');
        const options = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        var d = Date(Date.now());
        var time = d.substring(15,25);

        var obj = { ad_id: this.props.match.params.id ,
                    title: this.state.title,content: this.state.content,rating: this.state.submited_rating
        }

        console.log('obj');
        console.log(obj);

        axios.post(`${serviceConfig.baseURL}/reviewservice/api/review/submit-review`,obj , options).then(
            (response) => {
                store.addNotification({
                title: "",
                message: "Your review was successfully added!Our admin has to review it first before it can be published.",
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
                    title: "",
                    message: "You cannot create review!",
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


    handleChangeRating(e){


        this.setState({

            submited_rating : e,

        });
    }



    render() {
            let {show, ad} = this.state;

        return (

            <div>
                <Header />


                <Card style={{ backgroundColor: 'rgba(245,245,245,0.8)', width: '45%', height: '30%', marginLeft: '3%', marginTop: '6%'}}>
                    <Card.Title style={{ padding: '10px', textAlign: 'center', fontSize: '30px' }}>
                    {
                        this.state.permissions.includes('ORDER') &&
                        <img src={cart} className="imgCartAdView" title="Add to shopping cart" onClick={() => {this.setState({show:true})}}></img>
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
                                        <p>Daily price:</p>
                                        <p>Extra km price:</p>

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
                                        <p style={{marginTop:'18px'}}>{this.state.pricelist.dailyPrice}€</p>
                                        <p style={{marginTop:'17px'}}>{this.state.pricelist.pricePerExtraKm}€</p>
                                        {
                                            this.state.car.cdw &&
                                            <p style={{marginTop:'30px'}}>{this.state.pricelist.cdwPrice}€</p>
                                        }
                                        



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
                        <div>

                            <ReactStars
                                count={5}
                                size={24}
                                half={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                color2={"#ffd700"}
                                edit={false}
                                value={this.state.rating}
                            />

                        </div>

                        { (this.state.contains == true && this.state.can_leave_review == true) &&

                            <div>
                            <Card>
                                <Card.Title style={{marginTop:'10px',marginLeft:'20px'}}>Leave a review</Card.Title>
                                <Card.Body>
                                    <label>Rate us</label>
                                    <ReactStars
                                        count={5}
                                        onChange={this.handleChangeRating}
                                        name="rating"
                                        size={24}
                                        half={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        color2={"#ffd700"}
                                    />
                                    <input onChange={this.handleChange} name="title" placeholder="Title" type="text" style={{width:'80%',marginBottom:'2%'}}></input>
                                    <input onChange={this.handleChange} name="content" placeholder="Enter your review here" type="text" style={{width:'80%',height:'150px'}}></input>
                                    <br/>
                                    <Button onClick={this.submitReview.bind(this)} variant="outline-dark" style={{marginTop:'10px'}}>Submit</Button>
                                </Card.Body>
                            </Card>

                            </div>

                        }
                        <div>
                            <RenderReviews reviews={this.state.reviews}/>
                        </div>
                    </div>

                </div>



                <AdCalender show={show} ad={ad} handleClose={() => this.setState({show:false})}/>
            </div>
        )

    }





}

export default SingleAdPage
