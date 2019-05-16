import React, { Component } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { Form } from 'react-bootstrap';
import Moment from "moment";

export default class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            orders: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

    }

    onChange(event) {
        const state = this.state;
        state.date = event.target.value;
        const url = `${API_URL}/api/orders?date=${Moment(state.date).format("YYYY-MM-DD")}`
        const options = {
            method: "get",
            headers: { "content-type": "application/json", authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
            url
        };
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                state.orders = res.data;
                this.setState(state);
            })
            .catch(e => {
                console.log("Error", e);
            });
        
    }

    render() {
        return (
            <div className="content formClass">
                <Form>
                    <Form.Group controlId="forDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} onChange={this.onChange} required />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
