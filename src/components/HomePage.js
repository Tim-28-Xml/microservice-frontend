import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup} from "react-bootstrap"
import axios from 'axios'
import  '../css/HomePage.css'
import RenderAd from './RenderAd.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import moment from 'moment'
import search from '../icons/search.svg';
 




class HomePage extends React.Component{
    constructor(props){
        super(props);
        
        this.test = this.test.bind(this);


        this.state = {

            today: new Date(),
            startDate:'',
            minTime:'',
            maxTime:'',
            now:'',
            endDate:'',
            ads: [],

        }
    }

    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

      componentWillMount(){
          this.state.startDate=new Date(this.state.today.getFullYear(), this.state.today.getMonth(), (this.state.today.getDate() + 2),8,0,0,0); 
          this.state.endDate=new Date(this.state.startDate.getFullYear(), this.state.startDate.getMonth(), (this.state.startDate.getDate() + 1),8,0,0,0);         
          
      }

      componentDidMount() {

        this.getAds();
        //this.getRole();
        
    }


      getAds() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`https://localhost:8443/adservice/api/ads/all`).then(
            (resp) => {
                console.log(resp.data)
                this.setState({
                    ads: resp.data
                })

            },
            (resp) => { alert('error ads') }
        );
    }

    /*getRole(){

        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`https://localhost:8443/authenticationservice/api/auth/role`, options).then(
                    (response) => { self.changeState(response) },
                    (response) => {alert('Please log in.')}
            );
        }

    }*/


    test = event => {


        const options = {
            headers: {'Access-Control-Allow-Origin':'*'}
        };
     
         axios.get("https://localhost:8443/chatservice/api/test").then(
           (resp) => {alert(resp.data)
            console.log(resp);
            }
         );
     
     
     }

    render(){
        /*var ads = [];
        console.log(this.state.endDate);

        var car1= {id:1,brand:"Mercedes", fuel:"diesel",class:"sedan",transmission:"manual",model:'C class'}
        var car2= {id:2,brand:"Mazda", fuel:"diesel",class:"hatchback",transmission:"manual",model:'cx-50'}
        var car3= {id:3,brand:"Audi", fuel:"gas",class:"sedan",transmission:"automatic",model:'A6'}
        var car4= {id:4,brand:"Fiat", fuel:"diesel",class:"hatchback",transmission:"automatic",model:'500'}
        var car5= {id:5,brand:"Opel", fuel:"diesel",class:"hatchbakc",transmission:"manual",model:'astra'}


        ads.push(car1);
        ads.push(car2);
        ads.push(car3);
        ads.push(car4);
        ads.push(car5);*/



        return(
            <div>
                <Jumbotron className="jubmotron" style={{marginTop:"0px", height:"250px",width:"100%",backgroundColor:"white"}}>
            
                
                
                
                </Jumbotron>
                
                <Card className="searchCard" inline>
                    <div inline>
                        <InputGroup>
                    <Form.Control style={{width:'29%',position:'absolute',marginLeft:'1%',height:'31px'}} placeholder="Pickup location"></Form.Control>

                    
                            <div style={{marginTop:'0.5px',marginLeft:'32%'}}>
                            <label style={{marginRight:'6px'}}>Pickup date:</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat="hh:mm MM-dd-yyyy "
                                showTimeSelect
                                timeFormat="HH:mm"
                                minDate={this.state.startDate}
                                
                                
                                
                            />
                            </div>



                            <div style={{marginTop:'0.5px',marginLeft:'2%'}}>
                            <label style={{marginRight:'6px'}}>Return date:</label>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleChange}
                                dateFormat="hh:mm MM-dd-yyyy "
                                showTimeSelect
                                timeFormat="HH:mm"
                                minDate={this.state.endDate}
                                
                                
                                
                            />
                            </div>

                            <Button variant="outline-primary" style={{marginLeft:'2%',marginTop:'-0.5px',height:'30px',width:'60px',padding:'2px'}}>Find</Button>

                    </InputGroup>
                    </div>
                </Card>
                <Card className="backgroundCard">
                <RenderAd ads={this.state.ads}/>
                </Card>

            </div>
        )
    }
}

export default HomePage;