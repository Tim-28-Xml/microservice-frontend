import React, { useEffect, useState } from 'react';
import { Modal, Button, Col } from "react-bootstrap";
import ReactDatePicker from 'react-datepicker';
import axios from 'axios';
import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'

const AdCalender = ({show, handleClose, ad}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date());
    const [disabledDates, setDisabledDates] = useState([]);
    

    useEffect(() => {
        if(ad.rentDates !== undefined){
            setMin(ad.rentDates);
            setMax(ad.rentDates);
            setDisabled(ad.rentDates);
        }
    }, [ad.rentDates]);

    const setMin = (rentDates) => {
        let startDates = []

        rentDates.forEach(el => {
            startDates.push(new Date(el.startDate));
        })

        let minDate = new Date(Math.min.apply(null, startDates));
        setStartDate(minDate);
        setEndDate(minDate);
        setMinDate(minDate)
    }

    const setMax = (rentDates) => {
        let endDates = []

        rentDates.forEach(el => {
            endDates.push(new Date(el.endDate));
        })

        let maxDate = new Date(Math.min.apply(null, endDates));
        setMaxDate(maxDate);
    }

    const setDisabled = (rentDates) => {
        let disabled = [];
        rentDates.forEach((el) => {
            el.dates.forEach((el2) => {
                disabled.push(new Date(el2.date))
            })
        });
        setDisabledDates([...disabled]);
    }

    const handleStartDate = (date) => {
        if(date > endDate){
            setEndDate(date);
            setStartDate(date);
            return;
        }

        let disabledAfterDate = disabledDates.filter(el => date < el && endDate > el);
        
        if(disabledAfterDate.length > 0){
            let firstDisabled = new Date(Math.max.apply(null, disabledAfterDate));
            firstDisabled.setDate(firstDisabled.getDate() + 1);
            setStartDate(firstDisabled);
            return;
        }

        setStartDate(date);
            
    }

    const handleEndDate = (date) => {

        if(date < startDate){
            setEndDate(startDate)
            return;
        }
    
        let disabledBeforeDate = disabledDates.filter(el =>  el < date && el > startDate) ;
        
        if(disabledBeforeDate.length > 0){
            let firstDisabled = new Date(Math.min.apply(null, disabledBeforeDate));
            firstDisabled.setDate(firstDisabled.getDate() - 1);
            setEndDate(firstDisabled);
            return;
        }

        setEndDate(date);            

    }

    const handleConfirm = () => {        

        let token = localStorage.getItem('token');
        let dto = JSON.stringify({ adId: ad.id, startDate, endDate })

        if(token !== null){
  
            const options = {
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };

            axios.post(`${serviceConfig.baseURL}/adservice/shoppingcart`, dto, options).then(
                    (response) => 
                    {   
                        handleClose()
                        window.location.reload();
                        store.addNotification({
                            title: "Added to your cart!",
                            message: "View your shopping cart content by clicking on its icon.",
                            type: "success",
                            insert: "top",
                            container: "top-center",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                pauseOnHover: true
                              }
                            })

                     },
                    (response) => 
                    { 
                        console.log(response.response)
                        store.addNotification({
                            title: "Already in!",
                            message: "You have already ordered this car. Check your shopping cart.",
                            type: "danger",
                            insert: "top",
                            container: "top-center",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                pauseOnHover: true
                              }
                            })

                     }
            );
        }

    }

    return(
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Set date range</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <label style={{marginRight:"2%"}}>Select start date: </label>
                    <ReactDatePicker 
                        selectsStart
                        selected={startDate}
                        onChange={date => handleStartDate(date)}
                        excludeDates={disabledDates}
                        minDate={minDate}
                        maxDate={maxDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Col>
                <Col>
                    <label style={{marginRight:"3%"}}>Select end date: </label>
                    <ReactDatePicker
                        selectsEnd
                        onChange={date => handleEndDate(date)}
                        selected={endDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        excludeDates={disabledDates}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
                <Button variant="success" onClick={handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AdCalender;