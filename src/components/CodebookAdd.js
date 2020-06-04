import React, {useState, useEffect} from 'react';
import {Container, Row, Col, InputGroup, Button, Card, Form} from 'react-bootstrap';
import useCustomForm from '../hooks/useCustomForm';
import {serviceConfig} from '../appSettings.js'

function CodebookAdd({codebook, updateData}) {

    const [disabled, setDisabled] = useState(true);

    const initialValues = {
        brand: "",
        fuelType: "",
        transmissionType: "",
        carClass: "",
        brandSel: ""
    };

    const fetchData = (values, inputName) => {
        let token = localStorage.getItem('token');

        const body = {[inputName]: values[inputName]}
        
        if(inputName === 'model')
            body.brand = values.brandSel;
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        };
        
        fetch(`${serviceConfig.baseURL}/adservice/${inputName}`, options)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
        })
        .then(() =>  {
            updateData();
            values[inputName] = "";
        })
          .catch(response => {
              console.log(response);
        }) 
    }

    const {
        values,
        handleChange,
        handleSubmit
      } = useCustomForm({
        initialValues,
        onSubmit: fetchData
    });

    const renderSelectOptions = () => {
        if(codebook !== undefined){
            return codebook.brandModels.map(el => {
                return(
                    <option>{el.brand}</option>
                )
            });
        } 
    }

    useEffect(() => {
        if(values.brandSel != ""){
            setDisabled(false);
        }
    }, [values.brandSel]);

    return (
        <Container fluid>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Card>
                        <Card.Header style={{textAlign: "center"}}>
                            <h3>Modify Codebook</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={(e) => handleSubmit(e, 'brand')}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Brand</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                required
                                                type="text"
                                                name="brand"
                                                placeholder="Enter..." 
                                                onChange={handleChange}
                                                value={values.brand}
                                            />
                                            <InputGroup.Append>
                                                <Button type="submit">Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>                                            
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                            <hr/>

                            <Form onSubmit={(e) => handleSubmit(e, 'model')}>
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control as="select" name="brandSel" value={values.brandSel} onChange={handleChange}>
                                        <option hidden>Choose...</option>
                                        {renderSelectOptions()}
                                    </Form.Control>
                                </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Model</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                required
                                                disabled={disabled}
                                                type="text"
                                                name="model"
                                                placeholder="Enter..." 
                                                onChange={handleChange}
                                                value={values.model}
                                            />
                                            <InputGroup.Append>
                                                <Button type="submit" disabled={disabled}>Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>                                            
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                            <hr/>

                            <Form onSubmit={(e) => handleSubmit(e, 'fuelType')}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Fuel Type</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                required
                                                type="text"
                                                name="fuelType"
                                                placeholder="Enter..." 
                                                onChange={handleChange}
                                                value={values.fuelType}
                                            />
                                            <InputGroup.Append>
                                                <Button type="submit">Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>                                            
                                    </Form.Group>
                                </Form.Row>
                            </Form>        

                            <hr/>

                            <Form onSubmit={(e) => handleSubmit(e, 'transmissionType')}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Transmission Type</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                required
                                                type="text"
                                                name="transmissionType"
                                                placeholder="Enter..." 
                                                onChange={handleChange}
                                                value={values.transmissionType}
                                            />
                                            <InputGroup.Append>
                                                <Button type="submit">Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>                                            
                                    </Form.Group>
                                </Form.Row>
                            </Form>   

                            <hr/>

                            <Form onSubmit={(e) => handleSubmit(e, 'carClass')}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Car Class</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                required
                                                type="text"
                                                name="carClass"
                                                placeholder="Enter..." 
                                                onChange={handleChange}
                                                value={values.carClass}
                                            />
                                            <InputGroup.Append>
                                                <Button type="submit">Add</Button>
                                            </InputGroup.Append>
                                        </InputGroup>                                            
                                    </Form.Group>
                                </Form.Row>
                            </Form>        
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
  }
  
export default CodebookAdd;