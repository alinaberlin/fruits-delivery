import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, InputGroup, Col } from "react-bootstrap";
import AddressForm from "./AddressForm";
import axios from "axios";
import { API_URL } from "../../config";

class Register extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            validated: false,
            address: {},
            firstName: "",
            lastName: "",
            password: "",
            confirm: "",
            email: ""
        };
        this.handleAddress = this.handleAddress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    onChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        console.log("Form is", form, this.state.address);

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        // validated passwords
        if (this.state.password != this.state.confirm) {
            event.stopPropagation();
            this.setState({ validated: true, inValidPassword: true });
        } else {
            this.setState({ validated: true, validPassword: true });
        }
        const url = `${API_URL}/api/user`;
        console.log("Email, password", this.state.email, this.state.password, this.state.address);
        const options = {
            method: "post",
            data: {
                address: this.state.address,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                confirm: this.state.confirm,
                email: this.state.email
            },
            url
        };
        // execute post request
        axios(options)
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ redirect: true });
            })
            .catch(e => {
                console.log("Error", e);
            });
    }

    renderRedirect() {
        if (this.state.redirect && !this.props.isLoggedIn) {
            return <Redirect to="/login" />;
        }
    }

    handleAddress(address) {
        const state = this.state;
        state.address = address;
        this.setState(state);
    }

    render() {
        const { validated } = this.state;
        return (
            <div className="content formClass">
                {this.renderRedirect()}
                <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustomFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                value={this.state.firstName}
                                name="firstName"
                                onChange={this.onChange}
                                required
                                type="text"
                                placeholder="First name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                value={this.state.lastName}
                                name="lastName"
                                onChange={this.onChange}
                                required
                                type="text"
                                placeholder="Last name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                value={this.state.email}
                                name="email"
                                onChange={this.onChange}
                                type="email"
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please choose a email.</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustomPassword">
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                value={this.state.password}
                                name="password"
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please choose a password.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustomConfirm">
                            <Form.Label>Confirm</Form.Label>

                            <Form.Control
                                value={this.state.confirm}
                                name="confirm"
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                required
                                isInvalid={this.state.inValidPassword}
                            />
                            <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <AddressForm onAddressChange={this.handleAddress} />
                    </Form.Row>
                    <Form.Group>
                        <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." />
                    </Form.Group>
                    <Button type="submit" variant="secondary">
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register;
