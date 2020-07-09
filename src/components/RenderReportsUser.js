import React from 'react';
import {Button,Card,Row,Tab,Col,Nav} from "react-bootstrap"
import axios from 'axios'
import { store } from 'react-notifications-component';
import {serviceConfig} from '../appSettings.js'
import '../css/RenderRequests.css'
import moment from 'moment';
import SecureCancelModal from'./SecureCancelModal'

class RenderReportsUser extends React.Component{
    constructor(props){
        super(props);
    

        this.state = {
            reports: [],
        }
    }

    componentDidMount(){
        this.getReports();
    }

    getReports(){ 

        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/adservice/api/report/all`, options).then(
            (resp) => {

                this.setState({
                    reports: resp.data
                })

                console.log(this.state.reports)

            },
            (resp) => { 
                store.addNotification({
                    title: "",
                    message: "Error while loading reports!",
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

    reportPay(reportId) {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',    
                    }
        };

        let report = JSON.stringify({ reportId: reportId })

        console.log(report)
        axios.post(`${serviceConfig.baseURL}/adservice/api/report/pay`, report, options).then(
            (resp) => {

                
                this.setState({
                    reports: resp.data
                })

                store.addNotification({
                    title: "Successfully paid!",
                    message: "You have paid for kilometers over the limit.",
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

            },
            (resp) => { 
                store.addNotification({
                    title: "Error",
                    message: "Error while trying to pay!",
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


    renderUnpaidReports(){
        
        return this.state.reports.map((report, index) => {

            if(report.paid === false){
            return(
                <Card key={report.id} className="cardContainerReqsAll" >

                <Card.Body className = "cardBodyReqsUserAll">

                    <Card.Title className="cardTitleReq" style={{textAlign:"center"}}> 
                    {report.adDTO.carDTO.brand} {report.adDTO.carDTO.model}
                    <br />
                    <br/>
                    Over the limit: {report.overLimit}km
                    <br/>
                    Price: {report.price}€
                    <br />
                    <br />
                    <Button variant = "outline-success" onClick={this.reportPay.bind(this,report.id)}>Pay now</Button>
                    
                    </Card.Title>

                </Card.Body>
            </Card>
            )
            }
            
        })    
    }

    render(){
        return(
            <div style={{margin: '30px 80px 20px 0px' }}>
                {this.renderUnpaidReports()}
            </div>
        )
    }


}

export default RenderReportsUser