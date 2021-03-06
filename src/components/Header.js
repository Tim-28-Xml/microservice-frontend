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
import house from '../icons/homepage.png'
import logout from '../icons/logout (1).png'
import user from '../icons/user (3).png'
import register from '../icons/plus.png'
import message from '../icons/mail.svg'

class Header extends React.Component{
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {

            isLoggedIn: false,
            roles: [],
            msg: 0,
            read: false

        }
    }

    componentDidMount(){
        this.getRole();
        this.getMsg();
    }

    componentDidUpdate(){
        if(this.props.read !== this.state.msg && this.props.read !== undefined){
            this.getMsg();
        }
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


    getMsg(){
        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){

            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/chatservice/api/new`, options).then(
                    (response) => { this.setState({msg: response.data})},
                    (response) => { alert("error") }
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
                    <a href="https://localhost:3000/codebook" className="btnCodebook">Codebook</a>
                    <a title="Home" href="https://localhost:3000/" style={{margin:'2.5% 7%'}}><img src={house} style={{height:'30px',width:'30px',marginTop:'-5px'}}></img></a>
                    <a title="Register agent" style={{margin:'2.5% 7%'}} href="https://localhost:3000/register/agent"><img src={register} style={{height:'30px',width:'30px',marginTop:'-5px'}}></img></a>
                    <a title="Profile" href="https://localhost:3000/profile/admin" style={{margin:'2.5% 5%'}}><img src={user} style={{height:'30px',width:'30px',marginTop:'-5px'}}></img></a>
                    <Button title="Logout" variant="outline-light" style={{margin:'1% 7%'}} onClick={this.logout}><img src={logout} style={{height:'30px',width:'30px',marginTop:'-5px'}}></img></Button>
                    </div>
                }


                {
                    this.state.roles.includes('ROLE_USER') &&
                    <div className="headerButtonsUser">
                    <a title="Home" className="btnHeaderHome" href="https://localhost:3000/"><img src={house} style={{height:'30px',width:'30px',marginTop:'-15px'}}></img></a>
                    <a style={{width:'144px',margin:'1% 0%'}} className="createAd" href="https://localhost:3000/create-ad">Create Ad</a>
                    <a style={{width:'110px',margin:'1% 0%'}} className="createAd" href="https://localhost:3000/physical-rent">My ads</a>
                    <a className="pricelistUser" style={{margin:'1% 0%'}} href="https://localhost:3000/create-pricelist">Create pricelist</a>
                    <ShoppingBasket/>
                    <a title="Profile" href="https://localhost:3000/profile/user" style={{margin:'1.4% 3%'}}><img src={user} style={{height:'30px',width:'30px',marginTop:'-10px'}}></img></a>
                    <a title="Messages" href="https://localhost:3000/messages" style={{margin:'1.4% 3%'}}><img src={message} style={{height:'30px',width:'30px',marginTop:'-10px'}}></img></a>
                    { this.state.msg !== 0 && 
                        <label className="msgnumber">{this.state.msg}</label>
                    }
                    <Button title="Logout" variant="outline-light"  style={{width:'60px',marginLeft:'4px'}} onClick={this.logout}><img src={logout} style={{height:'30px',width:'30px',marginTop:'-5px'}}></img></Button>
                    </div>
                }

                {
                    this.state.roles.includes('ROLE_AGENT') &&
                    <div className="headerButtonsAgent">
                    <a  title="Home" style={{margin:'2% 4%'}} href="https://localhost:3000/"><img src={house} style={{height:'30px',width:'30px',marginTop:'0px'}}></img></a>
                    <a className="createAd" href="https://localhost:3000/create-ad">Create Ad</a>
                    <a className="physical" href="https://localhost:3000/physical-rent">My ads</a>
                    <a className="reqs" href="https://localhost:3000/pending/requests">Pending requests</a>
                    
                    <a className="pricelist" href="https://localhost:3000/create-pricelist">Create pricelist</a>
                    <a title="Messages" href="https://localhost:3000/messages" style={{margin:'2.3% 0%'}}><img src={message} style={{height:'30px',width:'30px',marginTop:'-10px'}}></img></a>
                    { this.state.msg !== 0 && 
                        <label className="msgnumber">{this.state.msg}</label>
                    }
                    <Button title="Logout" variant="outline-light" style={{margin:'1% 3%',height:'40px',width:'40px'}} onClick={this.logout}><img src={logout} style={{height:'30px',width:'30px',marginTop:'-1%'}}></img></Button>


                    </div>
                }



            </div>
        )
    }
}

export default Header;
