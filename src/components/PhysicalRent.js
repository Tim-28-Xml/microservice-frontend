import React from 'react';
import { Button, Card, Modal } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../css/CreateAd.css'
const moment = require('moment');

const DeclinedAlert = withReactContent(Swal)
class PhysicalRent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 0,
            role: ''


        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        this.getId();
    }

    getId() {


        let token = localStorage.getItem('token');
        let self = this;

        if (token !== null) {

            const options = {
                headers: { 'Authorization': 'Bearer ' + token }
            };

            axios.get(`${serviceConfig.baseURL}/authenticationservice/api/users/get-id`, options).then(
                (response) => this.onGetId(response.data),
                (response) => { }
            );
        }

    }

    onGetId(id) {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        this.state.userId = id;

        axios.get(`${serviceConfig.baseURL}/authenticationservice/api/auth/one/${id}`, options).then(
            (resp) => { this.setState({ role: resp.data.authorities[0].authority }) },
            (resp) => this.onErrorHandler(resp),
        );
    }

    onErrorHandler(resp) {
        DeclinedAlert.fire({
            title: "Something went wrong",
            text: '',
            type: "error",
            button: true
        });

        console.log(resp.data);

    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>caos</h1>
            </div>
        )
    }
}

export default PhysicalRent;