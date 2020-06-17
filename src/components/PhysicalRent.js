import React from 'react';
import { Button, Card, Modal } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import RenderAd from './RenderAd.js'
import "react-datepicker/dist/react-datepicker.css";
import '../css/CreateAd.css'
import { store } from 'react-notifications-component';

const moment = require('moment');

class PhysicalRent extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.rentByCreator = this.rentByCreator.bind(this);
        this.addDays = this.addDays.bind(this);

        this.state = {
            userId: 0,
            ads: [],
            show: false,
            startDate: new Date(),
            endDate: new Date(),
            dateStringStart: '',
            dateStringEnd: '',
            id: 0
        }

    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        this.getAds();

        this.state.minEndDate = this.addDays(this.state.startDate, 1);
        this.state.endDate = this.state.minEndDate;

    }

    getAds() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`https://localhost:8443/adservice/api/ads/my-ads`, options).then(
            (resp) => {
                console.log(resp.data)
                this.setState({
                    ads: resp.data
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
                
              }) }
        );
    }

    rentByCreator() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        var obj = {startDate: this.state.startDate, endDate: this.state.endDate, id: this.state.id}
        console.log(obj)
        axios.post(`https://localhost:8443/adservice/api/ads/rent-creator`, obj, options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => { 
                store.addNotification({
                    title: "",
                    message: "Something went wrong with renting this car!",
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

    onSuccessHandler(resp) {
        store.addNotification({
            title: "Success",
            message: "Car is rented successfully!",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                pauseOnHover: true
              },
            
          })

        console.log(resp.data);

        this.setState({ redirect: this.state.redirect === false });
        window.location.reload();
        this.handleClose();
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleStartDateChange(date) {
        var dateString = date.toISOString().substring(0, 10);
        console.log(dateString);

        this.setState({
            startDate: date,
            dateStringStart: dateString
        });
    }

    handleEndDateChange(date) {
        var dateString = date.toISOString().substring(0, 10);
        console.log(dateString);

        this.setState({
            endDate: date,
            dateStringEnd: dateString,
            minEndDate: this.addDays(this.state.startDate, 1)
        });
    }

    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    renderAdCards() {
        this.state.minEndDate = this.addDays(this.state.startDate, 1);
        return this.state.ads.map((ad, index) => {
            console.log(ad);
            this.state.id = ad.id;


            return (
                <Card key={ad.id} className="cardContainer" >

                    <Card.Body className="cardBody">

                        <Card.Title className="cardTitle" style={{ textAlign: "left" }}>{ad.carDTO.brand} {ad.carDTO.model}
                        </Card.Title>


                        <Card.Text className='cardText' style={{ padding: '3px', cursor: 'pointer' }} >
                            fuel: &nbsp; {ad.carDTO.fuel}
                            <br />
                                class: &nbsp; {ad.carDTO.carClass}
                            <br />
                                transmission: &nbsp; {ad.carDTO.transmission}
                        </Card.Text>
                        <button onClick={this.handleShow}>Physical rent</button>
                        <Modal
                            show={this.state.show}
                            onHide={this.handleClose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered="true"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Physical rent
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.rentByCreator} id="creatorForm">
                                    <div className="form-group">
                                        <div className="startDate">
                                            <label htmlFor="startDate">Start date</label>
                                            <br />
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleStartDateChange}
                                                value={this.state.dateStringStart.value}
                                                name="startDate"
                                                minDate={moment().toDate()}
                                            />
                                        </div>
                                        <br />
                                        <div className="endDate">
                                            <label htmlFor="endDate">End date</label>
                                            <br />
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.handleEndDateChange}
                                                value={this.state.dateStringEnd.value}
                                                name="endDate"
                                                minDate={this.state.minEndDate}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <Button type="submit" variant="info" className="dugme1dr">Create</Button>
                                    <Button className="dugmad" variant="secondary" onClick={this.handleClose}>Close</Button>

                                </form>
                            </Modal.Body>
                        </Modal>
                    </Card.Body>
                </Card>
            )
        })
    }


    render() {
        console.log(this.state)
        return (
            <div className="renderMyAds">
                {this.renderAdCards()}
            </div>
        )
    }
}

export default PhysicalRent;