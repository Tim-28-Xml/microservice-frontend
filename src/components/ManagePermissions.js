import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal } from "react-bootstrap";
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'

class ManagePermissions extends React.Component{
    constructor(props){
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderTableBlocked = this.renderTableBlocked.bind(this);

        this.state = {
            show: false,
            permissions: [],
            blockedPermissions: [],             
        }
    }

    componentDidMount(){
        this.getPermissions();
    }

    getPermissions(){
        let token = localStorage.getItem('token');
        var username = this.props.content;

        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
        
        axios.get(`${serviceConfig.baseURL}/authenticationservice/api/users/permissions/${username}`,options).then(
            (resp) => { 

                this.setState({
                    permissions: resp.data.permissions,
                    blockedPermissions: resp.data.blockedPermissions
                })
                
             },
            (resp) => { alert('error') }
        );
    }

    removePermission(perm){
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
        
        var username = this.props.content;

        axios.get(`${serviceConfig.baseURL}/authenticationservice/api/users/remove/permission/${username}/${perm}`,options).then(
            (resp) => { 

                this.setState({
                    permissions: resp.data.permissions,
                    blockedPermissions: resp.data.blockedPermissions
                })


             },
            (resp) => { alert('error') }
        );
    }

    addPermission(perm){
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
        
        var username = this.props.content;
        console.log(perm)
        axios.get(`${serviceConfig.baseURL}/authenticationservice/api/users/add/permission/${username}/${perm}`,options).then(
            (resp) => { 
                console.log(resp);
                this.setState({
                    permissions: resp.data.permissions,
                    blockedPermissions: resp.data.blockedPermissions
                })
                console.log(this.state)

             },
            (resp) => { alert('error') }
        );
    }
    



    renderTable(){

        if(this.state.permissions != null) {
        return this.state.permissions.map((perm, index) => {
            
            return (
                <tr key={perm}>
                    <td>{perm}</td>
                    <td><Button onClick={this.removePermission.bind(this, perm)} style={{float: 'right'}} variant="outline-danger">Remove</Button></td>
                </tr>
            )
        })
    } else {
        return(
            <td></td>
        )
    }
    }

    renderTableBlocked(){
        if(this.state.blockedPermissions != null) {
            return this.state.blockedPermissions.map((perm, index) => {
                
                return (
                    <tr key={perm}>
                        <td>{perm}</td>
                        <td><Button onClick={this.addPermission.bind(this, perm)} style={{float: 'right'}} variant="outline-success">Enable</Button></td>
                    </tr>
                )
            })
        } else {
            return(
                <td></td>
            )
        }
        }
    

    
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render(){
        return(
            <div>
                <Button variant="outline-info" onClick={this.handleShow}>
                    Manage Permissions
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                <Modal.Header style={{background: "rgb(234,241,248)"}}>
                    <h2 className="regAtitle">Manage Permissions</h2>
                </Modal.Header>
                <Modal.Body style={{background: "rgb(234,241,248)", padding: '1% 8%'}}>
                    <h2 style={{color: "rgb(85, 93, 95)", textAlign:'center'}}>{this.props.content}</h2>

                    <table className="table table-hover table-mc-light-blue">

                                <tbody>
                                    {this.renderTable()}
                                    {this.renderTableBlocked()}
                                </tbody>
                            </table>
                </Modal.Body>
                </Modal>
            </div>

        )
    }

}

export default ManagePermissions;