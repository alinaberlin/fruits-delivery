import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import Moment from "moment";

export default class OrdersHistory extends Component {
    state = {
        isAdmin: false,
        orders: []
    };
    componentDidMount() {
        const isAdmin = JSON.parse(localStorage.getItem("user")).user.isAdmin
        const url = isAdmin ? `${API_URL}/api/orders`:`${API_URL}/api/order`;
        const options = {
            method: "get",
            headers: { "content-type": "application/json", authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
            url
        };
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ isAdmin: isAdmin, orders: res.data });
            })
            .catch(e => {
                console.log("Error", e);
            });
    }
    render() {
        return (
            <div className="content formClass">
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Payment method</th>
                            <th>Payed</th>
                            {this.state.isAdmin ? '': <th>Edit</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{Moment(order.date).format("YYYY-MM-DD")}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.method}</td>
                                    <td>{order.isPayed ? "Yes" : "No"}</td>
                                    {this.state.isAdmin ? '': 
                                    <td>
                                        <Link to={`/order/${order._id}`}>Edit</Link>
                                    </td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
