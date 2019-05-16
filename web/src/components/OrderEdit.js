import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { API_URL } from "../config";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Moment from "moment";
const PRICE = 10;

export default class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            date: "",
            quantity: 1,
            method: "cash",
            price: 10
        };
    }

    componentDidMount() {
        const params = this.props.match.params;
        const url = `${API_URL}/api/order/${params.id}`;
        const options = {
            method: "get",
            headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
            url
        };
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                const order = res.data;
                order.date = Moment(order.date).format("YYYY-MM-DD");
                this.setState({ ...order });
            })
            .catch(e => {
                console.log("Error", e);
            });
    }
    handleSubmit(e) {
        console.log("save");
        const url = this.state._id ? `${API_URL}/api/order/${this.state._id}` : `${API_URL}/api/order`;
        const options = {
            method: this.state._id ? "put" : "post",
            headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
            data: {
                ...this.state
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
        if (this.state.redirectToCard && !this.state.isPayed) {
            return <Redirect to={`/cardpayment/${this.state._id}`} />;
        } else if (this.state.redirectToOrders || this.state.redirectToCard) {
            return <Redirect to="/orders" />;
        }
    };

    render() {
        return (
            <div className="content formClass">
                {this.renderRedirect()}
                <Form>
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

                    <Button type="button" onClick={this.handleSubmit} variant="secondary">
                        Order
                    </Button>
                </Form>
            </div>
        );
    }
}
