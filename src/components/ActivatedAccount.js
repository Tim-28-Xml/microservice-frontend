import React from 'react';
import LoginPage from './LoginPage'
import '../css/ActivatedAccount.css'
import caricon from '../icons/accountcar.svg'

class ActivatedAccount extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="activatedAccDiv">
                 <img src={caricon} style={{height:'50px', width: 'auto', margin: "2.5% 7% 0 0"}} alt='Unavailable icon' />
                 <div>
                    <h2>Welcome to Rent a Car!</h2>
                    <h4>Now you can log in.</h4>
                </div>
            </div>
        )
    }

}

export default ActivatedAccount