import React from 'react';
import {Button,Card,Jumbotron,Container,Form,InputGroup,Badge,Pagination} from "react-bootstrap"
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
import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'
import review from '../icons/customer.svg';
import downarrow from '../icons/down-arrow.svg'
import uparrow from '../icons/up-arrow.svg'



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
            selectedCity:'',
            selectedReturnTime:'',
            selectedModel:'',
            selectedBrand:'',
            selectedTransmission:'',
            selectedFuel:'',
            selectedCarClass:'',
            selectedMinPrice: 0,
            selectedMaxPrice:1000,
            selectedMinKm:0,
            selectedMaxKm:1000,
            selectedChildSeats:'',
            plannedMileage: 0,
            cdw: false,

            allads:[],
            isLoggedIn: false,
            roles: [],
            unapproved_reviews:[],
            unapproved_reviews_size: '',

            filterParameters: [],
            advancedHidden: true,
            pageNumber: 0,
            totalPages: 0

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

        this.getRole();
        this.getAds();
        this.getFilterParameteres();       
        
    }


      getAds() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`https://localhost:8443/adservice/api/ads/all/pageable?page=${this.state.pageNumber}`).then(
            (resp) => {

                var cities = [];

                resp.data.content.forEach(ad => {
                    cities.push(ad.city);
                });
            
                this.setState({
                    ads: resp.data.content,
                    allads: resp.data.content,
                    cities,
                    totalPages: resp.data.totalPages
                })

                

            },
            (resp) => { 
                store.addNotification({
                    title: "",
                    message: "Error while loading ads!",
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

    getRole(){

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

    }

    getFilterParameteres(){
        let token = localStorage.getItem('token');
        let self = this;


  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`https://localhost:8443/adservice/api/ads/filter/parameters`, options).then(
                    (response) => { 
                        this.setState({
                            filterParameters: response.data,
                            selectedMinPrice: response.data.minPrice,
                            selectedMaxPrice: response.data.maxPrice,
                            selectedMaxKm: response.data.maxKm,
                            selectedMinKm: response.data.minKm
                        })
                        console.log(this.state.filterParameters);

                     },
                    (response) => {alert('Please log in.')}
            );
        
    }

    changeState(resp) {
        

        var permissons = [];

        resp.data.forEach(element => {
            permissons.push(element.authority);
        });


        this.setState({
            isLoggedIn: true,
            roles: permissons,
         })

         console.log('resp in change state');
         console.log(this.state.roles.includes('ROLE_ADMIN'));

         if(this.state.roles.includes('ROLE_ADMIN')){
             this.checkReviews();
         }
    }

    clearFilters(){
        this.setState({
            ads: this.state.allads, 
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), ((new Date()).getDate() + 2),8,0,0,0),
            selectedPickupTime: new Date((new Date()).getFullYear(), (new Date()).getMonth(), ((new Date()).getDate() + 2),8,0,0,0),
            selectedReturnTime:'',   
            selectedCity:'',
            selectedModel:'',
            selectedBrand:'',
            selectedTransmission:'',
            selectedFuel:'',
            selectedCarClass:'',
            selectedMinPrice: this.state.filterParameters.minPrice,
            selectedMaxPrice: this.state.filterParameters.maxPrice,
            selectedMinKm: this.state.filterParameters.minKm,
            selectedMaxKm: this.state.filterParameters.maxKm,
            selectedChildSeats:'',
            plannedMileage: 0,
            cdw: false,
                
        })

        
    }

  


    filterAds(){

        if(this.state.selectedPickupTime === '' || this.state.selectedReturnTime === '' || this.state.selectedCity === ''){
            console.log(this.state.selectedModel)
            store.addNotification({
                title: "",
                message: "You did not enter all required the fields!",
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
            return;
        }

        var acutalpickup = new Date (this.state.selectedPickupTime.getFullYear(),this.state.selectedPickupTime.getMonth(),this.state.selectedPickupTime.getDate()+1);
        var acutalreturn = new Date (this.state.selectedReturnTime.getFullYear(),this.state.selectedReturnTime.getMonth(),this.state.selectedReturnTime.getDate()+1);

        var filterObject = {

            startDate: acutalpickup.toISOString().substring(0,10),
            endDate: acutalreturn.toISOString().substring(0,10),
            city: this.state.selectedCity,
            model: this.state.selectedModel,
            brand: this.state.selectedBrand,
            transmission: this.state.selectedTransmission,
            fuel: this.state.selectedFuel,
            carClass: this.state.selectedCarClass,
            minPrice: this.state.selectedMinPrice,
            maxPrice: this.state.selectedMaxPrice,
            minKm: this.state.selectedMinKm,
            maxKm: this.state.selectedMaxKm,
            childSeats: this.state.childSeats,
            plannedKm: this.state.plannedMileage,
            cdw: this.state.cdw,

        }

        console.log(filterObject);
        

        axios.post(`https://localhost:8443/adservice/api/ads/filter`,filterObject).then(
            (resp) => {

                console.log(resp.data);
                

                this.setState({

                    ads : resp.data,

                });
                

            },
            (resp) => { alert('error filter') }
        );


    }

    handleChangeSelect(e){   
        console.log(e)
        if(e.target !== undefined)
            var {name, value} = e.target;
        else
            var {name, value} = e;

        this.setState({ [name]: value });

    }

    checkReviews(){


            let token = localStorage.getItem('token');
            let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/reviewservice/api/review/all-unapproved`, options).then(
                
                (response) => { 

                    console.log('response from unapproved ads');
                    console.log(response.data);

                    const totalProps = Object.keys(response.data).length

                        this.setState({

                            unapproved_reviews_size: totalProps,
                            unapproved_reviews: response.data,
                        });
                    
                    
                },
                (response) => {

                    store.addNotification({
                        title: "",
                        message: "Error while loading unapproved ads!",
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

     goToReviewManagePage(){
        window.location.href="https://localhost:3000/managereviews";
    }

    changePage(e, num){
        if(num > this.state.totalPages - 1 || num < 0 || num === this.state.pageNumber)
            return

        this.setState({pageNumber: num}, this.getAds);
    }

    renderPagination(){
        let paginationElements = [];

        for (let index = 0; index < this.state.totalPages; index++) {
            if(index === this.state.pageNumber)
                paginationElements.push(<Pagination.Item key={index} active>{index+1}</Pagination.Item>)
            else
                paginationElements.push(<Pagination.Item key={index} onClick={(e) => this.changePage(e, index)}>{index+1}</Pagination.Item>)
                      
        }

        return paginationElements;
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
                <Jumbotron className="jubmotron" style={{marginTop:"0px", height:"250px",width:"100%",backgroundColor:"white"}}></Jumbotron>
                {

                this.state.roles.includes('ROLE_ADMIN') && this.state.unapproved_reviews_size !== 0 &&
                <div>
                        <Card className="reviewCard">
                            
                        <Card.Title style={{cursor:'pointer'}} onClick={this.goToReviewManagePage.bind(this)} ><img src={review} style={{width:'40px',height:'40px'}}></img> &nbsp; You have <Badge variant="primary">{this.state.unapproved_reviews_size} new </Badge> &nbsp;
                        {
                            this.state.unapproved_reviews_size > 1 &&
                            <label>reviews</label>
                        
                        } 
                        
                        {
                            this.state.unapproved_reviews_size <= 1 &&
                            <label>review</label>

                        }
                        &nbsp;
                        to approve/decline</Card.Title>
                        </Card>
                   
                </div>
                }   


                
                <Card className="searchCard" >
                    <div >
                        <InputGroup>
                        <div className="searchDivBig">
                        <div className="searchFirst">

                        { this.state.filterParameters.cities !== undefined && 
                            <Select 
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedCity}
                            name="selectedCity"
                            placeholder="Pickup location"
                            class="select"
                            options={
                                this.state.filterParameters.cities.map((city, index) => {
                
                                return {id:city,value:city, label:city};
                                })
                            }
                            
                            />
                        }
                        

                    
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

                            </div>
                            
                            
                            <div className="searchAdv">
                                <h2 className="advancedFilters">Advanced filters</h2>
                                { this.state.advancedHidden &&
                                    <img src={downarrow} style={{height: '20px', margin: '13px 0 0 10px', cursor: 'pointer'}} 
                                    onClick={() => this.setState({ advancedHidden: false })} />
                                }
                                { !this.state.advancedHidden &&
                                    <img src={uparrow} style={{height: '20px', margin: '13px 0 0 10px', cursor: 'pointer'}} 
                                    onClick={() => this.setState({ advancedHidden: true })} />
                                }
                            </div>
                            <div hidden = {this.state.advancedHidden} >
                            
                            <div className="searchSecond">
                            
                            { this.state.filterParameters.brands !== undefined && 
                            <Select 
                            
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedBrand}
                            name="selectedBrand"
                            placeholder="Brand"
                            class="select"
                            options={
                                this.state.filterParameters.brands.map((brand, index) => {
                
                                return {id:brand,value:brand, label:brand};
                                })
                            }
                            
                            />
                        }
                        { this.state.filterParameters.models !== undefined && 
                            <Select 
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedModel}
                            name="selectedModel"
                            placeholder="Model"
                            class="select"
                            options={
                                this.state.filterParameters.models.map((model, index) => {
                
                                return {id:model,value:model, label:model};
                                })
                            }
                            
                            />
                        }

                        </div>
                        <div className="searchThird">

                        { this.state.filterParameters.fuel !== undefined && 
                            <Select 
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedFuel}
                            name="selectedFuel"
                            placeholder="Fuel type"
                            class="select"
                            options={
                                this.state.filterParameters.fuel.map((fuel, index) => {
                
                                return {id:fuel,value:fuel, label:fuel};
                                })
                            }
                            
                            />
                        }
                        { this.state.filterParameters.transmission !== undefined && 
                            <Select 
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedTransmission}
                            name="selectedTransmission"
                            placeholder="Transmission type"
                            class="select"
                            options={
                                this.state.filterParameters.transmission.map((transmission, index) => {
                
                                return {id:transmission,value:transmission, label:transmission};
                                })
                            }
                            
                            />
                        }
                        { this.state.filterParameters.carClass !== undefined && 
                            <Select 
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedCarClass}
                            name="selectedCarClass"
                            placeholder="Car class"
                            class="select"
                            options={
                                this.state.filterParameters.carClass.map((carClass, index) => {
                
                                return {id:carClass,value:carClass, label:carClass};
                                })
                            }
                            
                            />
                        }
                        { this.state.filterParameters.childSeats !== undefined && 
                            <Select 
                            onChange={this.handleChangeSelect}
                            styles={customStyles}
                            selected={this.state.selectedChildSeats}
                            name="selectedChildSeats"
                            placeholder="Child seats"
                            class="select"
                            options={
                                this.state.filterParameters.childSeats.map((seat, index) => {
                
                                return {id:seat,value:seat, label:seat};
                                })
                            }
                            
                            />
                        }

                        </div>

                        <div className="sliders">
                        <div className="slidercontainer" >
                        <label>Min price</label>
                        <input type="range" className="slider"
                            min={this.state.filterParameters.minPrice} 
                            max={this.state.filterParameters.maxPrice} 
                            value={this.state.selectedMinPrice}
                            name="selectedMinPrice"
                            onChange={this.handleChangeSelect}
                        />
                        <label>{this.state.selectedMinPrice}</label>
                        </div>

                        <div className="slidercontainer" >
                        <label>Max price</label>
                        <input type="range" className="slider"
                            min={this.state.filterParameters.minPrice} 
                            max={this.state.filterParameters.maxPrice} 
                            name="selectedMaxPrice"
                            value={this.state.selectedMaxPrice}
                            onChange={this.handleChangeSelect}
                        />
                        <label>{this.state.selectedMaxPrice}</label>
                        </div>

                        </div>

                        <div className="sliders">
                        <div className="slidercontainer" >
                        <label>Min km</label>
                        <input type="range" className="slider"
                            min={this.state.filterParameters.minKm} 
                            max={this.state.filterParameters.maxKm}
                            name="selectedMinKm"
                            value={this.state.selectedMinKm}
                            onChange={this.handleChangeSelect}
                        />
                        <label>{this.state.selectedMinKm}</label> 
                        </div>

                        <div className="slidercontainer" >
                        <label>Max km</label>
                        <input type="range" className="slider"
                            min={this.state.filterParameters.minKm} 
                            max={this.state.filterParameters.maxKm} 
                            name="selectedMaxKm"
                            value={this.state.selectedMaxKm}
                            onChange={this.handleChangeSelect}
                        />
                        <label>{this.state.selectedMaxKm}</label>
                        </div>
                        </div>

                        <div>
                            <label style={{margin: '10px'}}>Planned mileage: </label>
                            <input type="number" name="plannedMileage" onChange={this.handleChangeSelect} style={{margin: '3px'}} />
                            <label style={{margin: '10px 50px 10px 0px'}}>km</label>
                            </div>
                            <div>

                            <input type="checkbox"
                                onChange={(e) => this.setState({ cdw: e.target.checked })}
                            style={{margin: '10px 10px'}} />
                            <label>Collision Damage Waiver</label>
                        </div>

                        </div>
                        <div className="searchBtns">

                            <Button variant="outline-primary" style={{marginLeft:'2%',marginTop:'13px',height:'30px',width:'60px',padding:'2px'}} 
                            onClick={this.filterAds.bind(this)}>Find</Button>
                            <Button onClick={this.clearFilters.bind(this)} variant="outline-danger" style={{marginLeft:'2%',marginTop:'13px',height:'30px',width:'100px',padding:'2px'}}>Clear filters</Button>
                        </div>
                        </div>
                    </InputGroup>
                    </div>
                </Card>


                <Card className="backgroundCard">
                <RenderAd ads={this.state.ads}/>
                
                <Pagination>
                    <Pagination.First onClick={(e) => this.changePage(e, 0)}/>
                    <Pagination.Prev onClick={(e) => this.changePage(e, this.state.pageNumber - 1)}/>
                        {this.renderPagination()}
                    <Pagination.Next  onClick={(e) => this.changePage(e, this.state.pageNumber + 1)}/>
                    <Pagination.Last  onClick={(e) => this.changePage(e, this.state.totalPages - 1)}/>
                </Pagination>

                </Card>

            </div>
        )
    }
}

export default HomePage;