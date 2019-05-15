import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { API_URL } from "../config";
import axios from "axios";
import { Redirect } from "react-router-dom";
const PRICE = 10;
export default class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        const quantity = this.props.quantity || 1;
        this.state = {
            date: this.props.date,
            customer: this.props.customer,
            quantity: quantity,
            method: this.props.method,
            price: quantity * PRICE
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("save");
        const url = `${API_URL}/api/order`;
        const options = {
            method: "post",
            headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
            data: {
                date: this.state.date,
                quantity: this.state.quantity,
                method: this.state.method
            },
            url
        };
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                if (this.state.method === "card") {
                    this.setState({ redirectToCard: true });
                } else {
                    this.setState({ redirectToOrders: true });
                }
            })
            .catch(e => {
                console.log("Error", e);
            });
    }
    onChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        state.price = this.state.quantity * PRICE;
        this.setState(state);
    }

    renderRedirect = () => {
        if (this.state.redirectToCard) {
            return <Redirect to="/cardpayment" />;
        }
        if (this.state.redirectToOrders) {
            return <Redirect to="/orders" />;
        }
    };

    render() {
        return (
            <div className="content formClass">
                {this.renderRedirect()}
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="forDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} onChange={this.onChange} required />
                    </Form.Group>
                    <Form.Group controlId="forQuantity">
                        <Form.Label>quantity ({this.state.price} &euro;)</Form.Label>
                        <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.onChange} required />
                    </Form.Group>
                    <Form.Group controlId="forMethod">
                        <Form.Label>payment method</Form.Label>
                        <Form.Control as="select" name="method" value={this.state.method} onChange={this.onChange} required>
                            <option>cash</option>
                            <option>card</option>
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit">Order</Button>
                </Form>
            </div>
        );
    }
}
