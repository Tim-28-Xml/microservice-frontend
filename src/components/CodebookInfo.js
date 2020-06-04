import React from 'react';
import { Container, Row, Col, ListGroup, Accordion, Button} from 'react-bootstrap';
import '../css/CodebookInfo.css'

function CodebookInfo({codebook}) {

    function renderBrand(){
        if(codebook !== undefined){
            return codebook.brandModels.map(el =>{
                return(
                    <Accordion key={el.brand}>
                        <Accordion.Toggle as={Button} variant="link" block eventKey="0">
                            {el.brand} 
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <ListGroup variant="flush">
                            {renderList(el.models)}
                        </ListGroup>
                        </Accordion.Collapse>
                    </Accordion>
                );
            });
        }
    }

    function renderList(list){
        return list.map((el, i) => 
            <ListGroup.Item key={i}>{el}</ListGroup.Item>  
        );
    }

    function renderOtherInfo(){
        if(codebook !== undefined){
            return(
                <Col>
                    <h4>Fuel Types</h4>
                    <Container>
                        <ListGroup variant="flush">
                            {renderList(codebook.fuelTypes)}
                        </ListGroup>
                    </Container>
                    <h4>Transmission Types</h4>
                    <Container>
                        <ListGroup variant="flush">
                            {renderList(codebook.transmissionTypes)}
                    </ListGroup>
                    </Container>
                    <h4>Car Classes</h4>
                    <Container>
                        <ListGroup variant="flush">
                        {renderList(codebook.carClasses)}
                    </ListGroup>
                    </Container>
                </Col>
            );
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h4>Brands & Models</h4>
                    <Container>
                        {renderBrand()}
                    </Container>
                </Col>
                    {renderOtherInfo()}
            </Row>
        </Container>
    );

    
} export default CodebookInfo;