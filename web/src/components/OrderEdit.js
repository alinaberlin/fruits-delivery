import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { API_URL } from "../config";
import axios from "axios";
import 'react-credit-cards/lib/styles.scss'
import Cards from 'react-credit-cards';
export default class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    state = {
        date: this.props.date,
        customer: this.props.customer,
        quantity: this.props.quantity,
        method: this.props.method
    };
    handleSubmit(e) {
        e.preventDefault();
        console.log("save");
        const url = `${API_URL}/api/order`;
        const options = {
            method: "post",
            headers: { "content-type": "application/json", "authorization": `Bearer ${localStorage.getItem('token')}` },
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
                this.setState({ redirect: true });
            })
            .catch(e => {
                console.log("Error", e);
            });
    }
    onChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    render() {
        return (
            <div className="content formClass">
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="forDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="forQuantity">
                        <Form.Label>quantity</Form.Label>
                        <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="forMethod">
                        <Form.Label>payment method</Form.Label>
                        <Form.Control type="text" name="method" value={this.state.delivery} onChange={this.onChange}/>
                    </Form.Group>

                    <Button type="submit">Order</Button>
                </Form>
            </div>
        );
    }
}
