import React from 'react';
import axios from 'axios'
import {serviceConfig} from '../appSettings.js'
import { store } from 'react-notifications-component'
import { Modal, Button, Card } from "react-bootstrap";
import 'react-table-6/react-table.css';
import matchSorter from 'match-sorter';
import '../css/Pricelists.css'
var ReactTable = require('react-table-6').default;

class Pricelists extends React.Component {

    constructor(props) {
        super(props);

        this.deletePricelist = this.deletePricelist.bind(this);

        this.state = {
            pricelists : [],

        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/adservice/api/pricelists/all`,options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );
    }

    onSuccessHandler(resp) {
        var temp = [];

        for (var i = 0; i < resp.data.length; i++) {
            temp.push(resp.data[i]);
        }
        this.setState({
            pricelists: temp
        });

    }

    onErrorHandler(response) {
        alert("errorrr");
    }

    deletePricelist(pricelist) {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(pricelist);

        console.log(this.state);

        axios.post(`${serviceConfig.baseURL}/adservice/api/pricelists/delete`, pricelist, options).then(
            (resp) => {
                store.addNotification({
                    title: "Success!",
                    message: "Pricelist is added.",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000,
                        pauseOnHover: true
                    },
                    onRemoval: (id, removedBy) => {
                        window.
                            location.href = "https://localhost:3000/"
                    }
                })
            },
            (resp) => {
                alert("error")
            }
        );
    }

    render() {

        const pricelists = [];

        for (var i = 0; i < this.state.pricelists.length; i++) {

            const name = this.state.pricelists[i].name;
            const cdw = this.state.pricelists[i].cdwPrice;
            const daily = this.state.pricelists[i].dailyPrice;
            const perkm = this.state.pricelists[i].pricePerExtraKm;


            { 
                pricelists.push(
                { 
                    name: name, 
                    cdw: cdw, 
                    daily: daily, 
                    perkm: perkm
                }
                            ); 
            }

        }

        const columns = [

            {
                accessor: "name",
                Header: "Name",
                Cell: ({ row }) => (<Button className="deletePricelist" variant="outline-danger" onClick={this.deletePricelist.bind(this, row)} >Delete {row.name}</Button>),
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true
            },
            {
                accessor: "cdw",
                Header: "Collision price",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["cdw"] }),
                filterAll: true
            },
            {
                accessor: "daily",
                Header: "Daily price",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["daily"] }),
                filterAll: true
            },
            {
                accessor: "perkm",
                Header: "Price per extra",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["perkm"] }),
                filterAll: true
                
            }
        ];

        return (
            <div>
                <ReactTable className="pricelistTable" data={pricelists} columns={columns}
                    minRows={0}
                    showPagination={false}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    onFilteredChange={(filtered, column, value) => {
                        this.onFilteredChangeCustom(value, column.id || column.accessor);
                    }} />

            </div>
        )

    }

} export default Pricelists;