import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../config";

export default class OrdersHistory extends Component {
    state = {
        orders: []
    };
    componentDidMount() {
        const url = `${API_URL}/api/order`;
        const options = {
            method: "get",
            headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
            url
        };
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ orders: res.data });
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{order.date}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.method}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
