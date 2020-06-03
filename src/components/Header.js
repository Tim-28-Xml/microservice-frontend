import React from 'react';
import {Button} from "react-bootstrap"
import '../css/Header.css'
import caricon from '../icons/rental.svg'
import Login  from '../components/LoginPage.js';
import RegistrationRolePage from './RegistrationRolePage';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {

            isLoggedIn: false,
            roles: [],

        }
    }


    render(){
        return(
            <div style={{background: "rgba(142, 213, 250,0.3)", display: "flex", height: "45px"}} >
                <h2 className="headerTitle">Rent a Car</h2>
                <img  style={{height:'40px', width: 'auto', margin: "0 0 0 40%"}}  />

                <a className="btnHeaderHome" href="https://localhost:3000/"><Button variant="outline-light" style={{color:'gray'}}>Home</Button></a>
                <RegistrationRolePage/>
                
                
                <a className="borderLabel" href="https://localhost:3000/login">&nbsp; | Have an account? Login</a>
                
                

                

            </div>
        )
    }
}

export default Header;