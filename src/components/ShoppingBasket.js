import React from 'react'
import { Modal, Button, Card } from "react-bootstrap";
import basketicon from '../icons/basket.svg'

class ShoppingBasket  extends React.Component{
    constructor(props) {
        super(props);
    

    this.state ={}

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render() {
        return (
            <div>
                

                <img src={basketicon} className="basketIcon" onClick={this.handleShow} style={{marginLeft:'-23px'}}>
                    
                </img>

                <Modal 
                 show={this.state.show}
                 onHide={this.handleClose}
                 aria-labelledby="contained-modal-title-vcenter"
                 centered = "true"
                 style={{textAlign:'center'}}
                
                >
                    <Modal.Header style={{background: "rgba(142, 213, 250,0.1)",textAlign:'center'}}>
                           <h1 style={{color:'#1C78C0'}}>Shopping basket</h1> 
                    </Modal.Header>

                   
                <Modal.Body style={{background: "rgba(142, 213, 250,0.1)",padding:'5px'}}>
                       

                </Modal.Body>


                </Modal>
            </div>
        )

    }
    

}
export default ShoppingBasket