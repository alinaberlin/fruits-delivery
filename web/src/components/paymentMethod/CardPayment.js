import React, { Component } from "react";
import "react-credit-cards/lib/styles.scss";
import Card from "react-credit-cards";
import { Redirect } from "react-router-dom";

import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from "./utils";
import styles from "./styles.css";

export default class CardPayment extends Component {
    constructor(props) {
        super(props);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.paySuccessful = this.paySuccessful.bind(this);
    }
    state = {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/orders" />;
        }
    };

    paySuccessful() {
        const state = this.state;
        state.redirect = true;
        this.setState(state);
    }

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

        return (
            <div key="Payment">
                {this.renderRedirect()}
                <div className="App-payment">
                    <h1>Pay by Card</h1>
                    <Card number={number} name={name} expiry={expiry} cvc={cvc} focused={focused} callback={this.handleCallback} />
                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <small>E.g.: 49..., 51..., 36..., 37...</small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button onClick={this.paySuccessful} className="btn btn-primary btn-block">
                                PAY
                            </button>
                        </div>
                    </form>
                    {formData && (
                        <div className="App-highlight">
                            {formatFormData(formData).map((d, i) => (
                                <div key={i}>{d}</div>
                            ))}
                        </div>
                    )}
                    <hr style={{ margin: "60px 0 30px" }} />
                    <hr style={{ margin: "30px 0" }} />
                </div>
            </div>
        );
    }
}
