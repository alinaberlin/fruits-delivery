import React, { Component } from "react";

export default class Agenda extends Component {
    state = {
        date: this.props.date,
        orders: this.props.orders,
        deliveryAddress: this.props.deliveryAddress
    };
    render() {
        return <div />;
    }
}
