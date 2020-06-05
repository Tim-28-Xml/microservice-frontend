import React from 'react';
import {Button} from "react-bootstrap"
import '../css/Header.css'
import caricon from '../icons/rental.svg'
import Login  from '../components/LoginPage.js';
import RegistrationRolePage from './RegistrationRolePage';
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import cart from '../icons/basket.svg'
import ShoppingBasket from './ShoppingBasket'

class Header extends React.Component{
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {

            isLoggedIn: false,
            roles: [],

        }
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
        console.log(resp);

        var permissons = [];

        resp.data.forEach(element => {
            permissons.push(element.authority);
        });
        
        
        this.setState({ 
            isLoggedIn: true,
            roles: permissons,
         })
    }

    logout(){
        //const token = JSON.parse(localStorage.getItem('token'));
      
        this.setState({
            isLoggedIn: false
        });
          
        localStorage.clear();
        window.location.href="https://localhost:3000/";
    }




    render(){

        return(
            <div style={{background: "rgba(142, 213, 250,0.3)", display: "flex", height: "45px"}} >
                <h2 className="headerTitle">Rent a Car</h2>
                <img  style={{height:'40px', width: 'auto', margin: "0 0 0 40%"}}  />

                { !this.state.isLoggedIn &&
                    <div className="headerButtons2">
                    <a className="btnHeaderHome" href="https://localhost:3000/">Home</a>
                    <a className="btnHeaderHome" href="https://localhost:3000/register/user">Register</a>           
                    <a className="btnLogin" href="https://localhost:3000/login">| Have an account? Login</a>
                    </div>
                }

                {
                    this.state.roles.includes('ROLE_ADMIN') &&
                    <div className="headerButtonsAdmin">
                    <a href="https://localhost:3000/" className="btnHeaderHome">Home</a>
                    <a className="btnRegAgent" href="https://localhost:3000/register/agent">Register agent</a>
                    <a href="https://localhost:3000/codebook" className="btnCodebook">Codebook</a>
                    <a href="https://localhost:3000/profile/admin" className="btnHeaderHome">Profile</a>          
                    <button className="logoutBtnAdmin" onClick={this.logout}>Log out</button>
                    </div>
                }

                
                {
                    this.state.roles.includes('ROLE_USER') &&
                    <div className="headerButtonsUser">
                    <a className="btnHeaderHome" href="https://localhost:3000/">Home</a>
                    <a className="createAd" href="https://localhost:3000/create-ad">Create Ad</a>
                    <ShoppingBasket />
                    <button className="logoutBtn" onClick={this.logout}>Log out</button>
                    </div>
                }

                {
                    this.state.roles.includes('ROLE_AGENT') &&
                    <div className="headerButtonsAgent">
                    <a className="btnHeaderHome" href="https://localhost:3000/">Home</a>
                    <a className="createAd" href="https://localhost:3000/create-ad">Create Ad</a>
                    <a className="physical" href="https://localhost:3000/physical-rent">Physical rent</a>
                    <button className="logoutBtn" onClick={this.logout}>Log out</button>
                    </div>
                }

                

            </div>
        )
    }
}

export default Header;