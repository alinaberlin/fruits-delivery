import React, { Component } from "react";

import { Button, Form } from "react-bootstrap";
import { API_URL } from "../../config";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = { validated: false, email: "", password: "" };
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/orders" />;
        }
    };

    onChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true });
        // create url
        const url = `${API_URL}/auth/login`;
        console.log("Email, password", this.state.email, this.state.password);
        // creat axios options
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            data: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            url
        };
        // execute post request
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                localStorage.setItem("token", res.data.token);
                this.setState({ redirect: true });
                this.props.handleLogin();
            })
            .catch(e => {
                console.log("Error", e);
            });
    }

    render() {
        const { validated } = this.state;
        return (
            <div className="content formClass">
                {this.renderRedirect()}
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            onChange={this.onChange}
                            value={this.state.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="secondary">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Login;
