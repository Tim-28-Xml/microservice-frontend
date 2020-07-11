import React from 'react';
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import { Modal, Button, Card } from "react-bootstrap";
import 'react-table-6/react-table.css';
import matchSorter from 'match-sorter';
import { store } from 'react-notifications-component'
var ReactTable = require('react-table-6').default;

class MyAds extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ad : [],
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/adservice/api/ads/my-ads`,options).then(
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
            ads: temp
        });

    }

    onErrorHandler(response) {
        alert("errorrr");
    }

    deleteAd(ad) {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(this.state);

        axios.post(`${serviceConfig.baseURL}/adservice/api/ads/delete`, ad, options).then(
            (resp) => {
                store.addNotification({
                    title: "Success!",
                    message: "Advertisment is deleted.",
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

        const ads = [];

        for (var i = 0; i < this.state.ads.length; i++) {

            const price = this.state.ads[i].price;
            const km = this.state.ads[i].km;
            const id = this.state.ads[i].id;


            { 
                ads.push(
                { 
                    price: price, 
                    km: km,
                    id: id
                }
                            ); 
            }

        }

        const columns = [

            {
                accessor: "id",
                Header: "Id",
                Cell: ({ row }) => (<Button className="deleteAd" variant="outline-danger" onClick={this.deleteAd.bind(this, row)} >Delete {row.id}</Button>),
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["id"] }),
                filterAll: true
            },
            {
                accessor: "price",
                Header: "Price",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["price"] }),
                filterAll: true
            },
            {
                accessor: "km",
                Header: "Kilometers",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["km"] }),
                filterAll: true
            }
        ];

        return (
            <div>
                <ReactTable className="adsTable" data={ads} columns={columns}
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
} export default MyAds;

