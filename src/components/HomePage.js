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
import Select from 'react-select';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import chroma from 'chroma-js';




class HomePage extends React.Component{
    constructor(props){
        super(props);
        
        this.test = this.test.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);


        this.state = {

            today: new Date(),
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), ((new Date()).getDate() + 2),8,0,0,0),
            selectedPickupTime: new Date((new Date()).getFullYear(), (new Date()).getMonth(), ((new Date()).getDate() + 2),8,0,0,0),
            minTime: moment('08:00', 'HH:mm'),
            maxTime: moment('20:00', 'HH:mm'),
            now:'',
            endDate:'',
            ads: [],
            cities:[],
            selectedCity:'',
            selectedReturnTime:'',
            allads:[],
            allcities:[],

        }



        
    }

    handleChange = date => {

        this.setState({
          selectedPickupTime: date
        });

      };

      handleChangeReturnTime = date => {
        this.setState({
          selectedReturnTime: date
        });
      };

      componentWillMount(){
          
          /*this.state.startDate=new Date(this.state.today.getFullYear(), this.state.today.getMonth(), (this.state.today.getDate() + 2),8,0,0,0); 
          this.state.selectedPickupTime = this.state.startDate;*/
          //this.state.endDate=new Date(this.state.selectedPickupTime.getFullYear(), this.state.selectedPickupTime.getMonth(), (this.state.selectedPickupTime.getDate() + 1),8,0,0,0);  

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

                var cities = [];

                resp.data.forEach(ad => {
                    cities.push(ad.city);
                });
            
                this.setState({
                    ads: resp.data,
                    allads: resp.data,
                    cities: cities,
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

    clearFilters(){
        this.setState({
            ads: this.state.allads, 
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), ((new Date()).getDate() + 2),8,0,0,0),
            selectedPickupTime: new Date((new Date()).getFullYear(), (new Date()).getMonth(), ((new Date()).getDate() + 2),8,0,0,0),
            selectedReturnTime:'',   
            selectedCity:'',
                
        })

        
    }

  


    filterAds(){

        if(this.state.selectedPickupTime == '' || this.state.selectedReturnTime == '' || this.state.selectedCity == ''){
            alert("You didnt enter all the fields");
            return;
        }

        var returnads = [];

        Date.prototype.addDays = function(days) {
            this.setDate( this.getDate()  + days);
            return this;
          };
        

        var dateArray = [];
        var currentDate = new Date(this.state.selectedPickupTime.getFullYear(),this.state.selectedPickupTime.getMonth(),this.state.selectedPickupTime.getDate());
        //alert('pocetak'+currentDate); 
        var endDate = new Date(this.state.selectedReturnTime.getFullYear(),this.state.selectedReturnTime.getMonth(),this.state.selectedReturnTime.getDate());
        //alert('kraj'+endDate); 
        while (currentDate <= endDate) {
                           
        dateArray.push((new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()+1)).toISOString().substring(0,10));
        //alert(currentDate.toISOString().substring(0,10))
        currentDate = currentDate.addDays(1);
        }

      
        
        //alert(this.state.selectedPickupTime.toString().substring(0,10));
        //alert(this.state.selectedPickupTime);
        var acutalpickup = new Date (this.state.selectedPickupTime.getFullYear(),this.state.selectedPickupTime.getMonth(),this.state.selectedPickupTime.getDate()+1);
        var acutalreturn = new Date (this.state.selectedReturnTime.getFullYear(),this.state.selectedReturnTime.getMonth(),this.state.selectedReturnTime.getDate()+1);
        //alert('take:'+this.state.selectedPickupTime.toISOString().substring(0,10) + ' and return: ' +this.state.selectedReturnTime.toISOString().substring(0,10));

        
        
    

        this.state.allads.forEach(ad => {

            
            console.log('od selekta' +this.state.selectedCity);
            console.log(this.state.cities);
            


            if(ad.city == this.state.selectedCity){

                ad.rentDates.forEach(period => {
                    
                    var periodDateArray = [];

                    period.dates.forEach(el => {

                        periodDateArray.push(el.date);
                        
                    });

                    

                    console.log("datumi za "+ ad.carDTO.brand+ad.carDTO.model);                  
                    console.log(periodDateArray);
                    console.log(acutalpickup.toISOString().substring(0,10));
                    
                    
                   //alert(periodDateArray.indexOf(acutalpickup.toISOString().substring(0,10)));
                   //alert(periodDateArray[0]);
                   //alert(periodDateArray.indexOf(acutalpickup.toISOString().substring(0,10)) !== -1);

                    if (periodDateArray.indexOf(acutalpickup.toISOString().substring(0,10),0) !== -1) {

                        if(periodDateArray.indexOf(acutalreturn.toISOString().substring(0,10),0) !== -1) {

                        

                            dateArray.forEach(date => {
                                
                                if(periodDateArray.indexOf(date) == -1){
                                
                                    
                                    return;
                                }
                                
                            });
                            
                            
                        returnads.push(ad);

                        }
                    }

                });
        }
            
        });

        this.setState({
            ads : returnads,
        })
    

    }

    handleChangeSelect(e){

        console.log("e"+e.value);
        

        this.setState({ selectedCity: e.value });

    }




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

        const customStyles = {
            option: (provided, state) => ({
              ...provided,
              borderBottom: '1px dotted black',
              color: state.isSelected ? 'black' : 'black',
              padding: 5,
              
            }),
            control: () => ({
              // none of react-select's styles are passed to <Control />
              width: 300,
              backgroundColor:'rgba(142, 213, 250,0.3)',
              height:65,
              
            }),
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
              
          
              return { ...provided, opacity, transition };
            }
          }

   

        return(
            <div>
                <Jumbotron className="jubmotron" style={{marginTop:"0px", height:"250px",width:"100%",backgroundColor:"white"}}>
            
                
                
                
                </Jumbotron>
                
                <Card className="searchCard" inline>
                    <div inline>
                        <InputGroup>
                    <Select 
                    onChange={this.handleChangeSelect}
                    styles={customStyles}
                    selected={this.state.selectedCity}
                    placeholder="Pickup location"
                    class="select"
                    options={
                        this.state.cities.map((city, index) => {
        
                        return {id:city,value:city, label:city};
                         })
                       }
                    >


                    </Select>

                    
                            <div style={{marginTop:'15px',marginLeft:'3%'}}>
                            <label style={{marginRight:'6px'}}>Pickup date:</label>
                           
                                <DatePicker
                                    selected={this.state.selectedPickupTime}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    minDate={this.state.startDate}
                                    minTime={setHours(setMinutes(this.state.startDate.getFullYear(), this.state.startDate.getMonth(), (this.state.startDate.getDate() + 2), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 20)}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="Time"
                                />
                            </div>



                            <div style={{marginTop:'15px',marginLeft:'2%'}}>
                            <label style={{marginRight:'6px'}}>Return date:</label>
                            <DatePicker
                                    id="returndate"
                                    selected={this.state.selectedReturnTime}
                                    onChange={this.handleChangeReturnTime}
                                    showTimeSelect
                                    minDate={new Date(this.state.selectedPickupTime.getFullYear(), this.state.selectedPickupTime.getMonth(), (this.state.selectedPickupTime.getDate() + 1),8,0,0,0)}
                                    minTime={setHours(setMinutes(this.state.selectedPickupTime.getFullYear(), this.state.selectedPickupTime.getMonth(), (this.state.selectedPickupTime.getDate() + 2), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 20)}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="Time"
                                />
                            </div>

                            <Button variant="outline-primary" style={{marginLeft:'2%',marginTop:'13px',height:'30px',width:'60px',padding:'2px'}} 
                            onClick={this.filterAds.bind(this)}>Find</Button>
                            <Button onClick={this.clearFilters.bind(this)} variant="outline-danger" style={{marginLeft:'2%',marginTop:'13px',height:'30px',width:'100px',padding:'2px'}}>Clear filters</Button>

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