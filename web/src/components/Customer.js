import React, { Component } from "react";

export default class Costumer extends Component {
    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        address: this.props.address
    };
    render() {
        return (
            <div>
                <div className="Customer">
                    <div>
                        <strong>First Name</strong>: {this.props.firstName} <br />
                        <strong>Last Name</strong>: {this.props.lastName} <br />
                        <strong>Address</strong>: {this.props.address} <br />
                    </div>
                </div>
            </div>
        );
    }
}
