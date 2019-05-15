import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { API_URL } from "../../config";
import axios from "axios";

export default class Profile extends Component {
    state = { address: {}, firstName: "", lastName: "", password: "", email: "" };
    componentDidMount() {
        const url = `${API_URL}/api/me`;
        const options = {
            method: "get",
            headers: { "content-type": "application/json", authorization: `Bearer ${this.props.token}` },
            url
        };
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ ...res.data });
            })
            .catch(e => {
                console.log("Error", e);
            });
    }
    render() {
        return (
            <div className="content formClass">
                <ListGroup>
                    <ListGroup.Item>First Name: {this.state.firstName}</ListGroup.Item>
                    <ListGroup.Item>Last Name: {this.state.firstName}</ListGroup.Item>
                    <ListGroup.Item>Email: {this.state.email}</ListGroup.Item>
                    <ListGroup.Item>City: {this.state.city}</ListGroup.Item>
                    <ListGroup.Item>Street: {this.state.street}</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}
