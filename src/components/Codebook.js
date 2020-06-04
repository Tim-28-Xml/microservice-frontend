import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Container, Tab } from "react-bootstrap";
import '../css/Codebook.css'
import CodebookInfo from './CodebookInfo';
import CodebookAdd from './CodebookAdd';
import {serviceConfig} from '../appSettings.js'


function Codebook() {

    const [codebook, setCodebook] = useState();

    useEffect(() => {     
        fetchData();
      }, []);

    const fetchData = async () => {
        
        let token = localStorage.getItem('token');

        const options = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token}
        };
        
        await fetch(`${serviceConfig.baseURL}/adservice/codebook`, options)
            .then(response => {
              if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.json(); 
          })
          .then((data) =>  {
            setCodebook(data);
          })
          .catch(response => {
              console.log(response);
          })  
    };

    return (
      <Container fluid>
          <Row>
                <Col></Col>
                <Col xs={8}>
                    <Tabs defaultActiveKey="1" variant="pills">
                        <Tab eventKey="1" title="View">
                            <CodebookInfo codebook={codebook}/>
                        </Tab>
                        <Tab eventKey="2" title="Add">
                            <CodebookAdd codebook={codebook} updateData={fetchData}/>
                        </Tab>
                    </Tabs >
                </Col>
                <Col></Col>
          </Row>
      </Container>
    );
  }
  
export default Codebook;