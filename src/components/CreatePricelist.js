import React from 'react';
import axios from 'axios'

class CreatePricelist extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.createPricelist = this.createPricelist.bind(this);

        this.state = {
            name: '',
            dailyPrice: 0,
            cdwPrice: 0,
            pricePerExtraKm: 0
        }
    }

    createPricelist(event) {
        event.preventDefault();
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(this.state);

        axios.post(`https://localhost:8443/api/pricelists/save`, this.state, options).then(
            (resp) => {alert("success")},
            (resp) => { alert("error")
             }
        );
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    render() {
        console.log(this.state);
        return (
            <div style={{ width: "25%", marginLeft: "35%", height: "50%", padding: "50px" }}> 
                 <form onSubmit={this.createPricelist} id="createAdForm">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            className="form-control form-control-sm"
                            id="name"
                            name="name"
                            onChange={this.handleChange}
                            placeholder="Enter name"
                            required
                        />
                        <br />
                        <label htmlFor="dailyPrice">Price per day</label>
                        <input type="number"
                            className="form-control form-control-sm"
                            id="dailyPrice"
                            name="dailyPrice"
                            onChange={this.handleChange}
                            placeholder="Enter daily price"
                            required
                        />
                        <br />
                        <label htmlFor="cdwPrice">Cdw price</label>
                        <input type="number"
                            className="form-control form-control-sm"
                            id="cdwPrice"
                            name="cdwPrice"
                            onChange={this.handleChange}
                            placeholder="Enter cdw price"
                            required
                        />
                        <br />
                        <br/>
                        <label htmlFor="pricePerExtraKm">Price if km limit is crossed</label>
                        <input type="number"
                            className="form-control form-control-sm"
                            id="pricePerExtraKm"
                            name="pricePerExtraKm"
                            onChange={this.handleChange}
                            placeholder="Enter km limit price"
                            required
                        />
                        <br />
                    </div>
                    <hr />
                    <button type="submit" className="submitAd">Create</button>
                    <button className="closeModal" onClick={this.handleClose}>Close</button>
                </form>
            </div>
        )
    }

}

export default CreatePricelist;