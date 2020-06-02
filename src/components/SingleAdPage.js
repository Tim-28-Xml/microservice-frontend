import React,{Component} from 'react'
import { Modal, Button, Card , Carousel} from "react-bootstrap";
import axios from 'axios';
import Header from '../components/Header.js';
import car1 from '../icons/slika1.jpeg';
import car2 from '../icons/slika2.jpeg';
import comments from '../icons/review (1).svg'


class SingleAdPage  extends React.Component{
    constructor(props) {
        super(props);

        this.state ={

        
        }

        console.log(this.props.match.params)
       
    }


    

    render() {
        return (
            <div>
                <Header/>
                

                <Card style={{backgroundColor:'rgba(245,245,245,0.8)',width:'50%',height:'30%',marginLeft:'24%',marginTop:'6%'}}>
                    <Card.Title style={{padding:'10px',textAlign:'center',fontSize:'30px'}}>
                        Ad
                    </Card.Title>

                    <Card.Body>

                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={car1}
                                    alt="First slide"
                                    style={{height:'500px',width:'300px'}}
                                />
                               
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={car2}
                                    alt="Third slide"
                                    style={{height:'500px',width:'300px'}}
                                />

                                
                            </Carousel.Item>
                            
                        </Carousel>
                        <Card.Text style={{textAlign:'left',padding:'15px'}}>

                            <p>Class:</p>
                            <p>Fuel type:</p>
                            <p>Transmission</p>
                            <p>Kilometers traveled:</p>
                            <p>Kilometers limit:</p>
                            <p>Number of child seats:</p>
                            
                            <p>Collision damage waiver </p>

                        </Card.Text>
                    </Card.Body>

                </Card>

                <div style={{marginLeft:"24%",marginTop:'3%'}}>
                    <div style={{marginTop:'10px',marginBottom:'10px',padding:'15px'}}>
                    <img src={comments} style={{height:'50px',width:'50px'}}></img>
                    <h2>REVIEWS &amp; RATINGS</h2>
                    </div>
                    <Card style={{width:'50%',height:'auto',padding:'15px'}}>
                        
                    </Card>
                </div>
            

            </div>
        )

    }





}

export default SingleAdPage
