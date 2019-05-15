import React, { Component } from "react";

export default class Delivery extends Component {
    state = {
        name: this.props.name,
        address: this.props.address,
        email: this.props.email
    };
    render() {
        return (
            <div>
                <div className="Delivery">
                    <div>
                        <strong>First Name</strong>: {this.props.firstName} <br />
                        <strong>Last Name</strong>: {this.props.lastName} <br />
                        <strong>Language</strong>: {this.props.language} <br />
                        <strong>Address</strong>: {this.props.address} <br />
                        <strong>Medical Specialization </strong>: {this.props.medicalSpecialization} <br />
                    </div>
                </div>
            </div>
        );
    }
}
