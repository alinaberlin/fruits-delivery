import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class OrdersHistory extends Component {
    state = {
        orders: []
    };
    componentDidMount() {
        let date = new Date();
        let date2 = new Date();
        date2.setDate(date2.getDate() + 1);
        const orders = [
            {
                date: date.toDateString(),
                quantity: 2,
                method: "cash"
            },
            {
                date: date2.toDateString(),
                quantity: 3,
                method: "cash"
            }
        ];
        this.setState({ orders: orders });
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
