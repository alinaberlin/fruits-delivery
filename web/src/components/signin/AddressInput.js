import React, { Component } from 'react';
import AddressItem from "./AddressItem"


class AddressInput extends Component {
    render() {
      return (
        <div className="card"><div className="card-body">
        <AddressItem label="Street" value={this.props.street} placeholder="" readonly="true" />
        <AddressItem label="City" value={this.props.city} placeholder="" readonly="true" />
        <AddressItem label="State" value={this.props.state} placeholder="" readonly="true" />
        <AddressItem label="Postal Code" value={this.props.postalCode} placeholder="" readonly="true" />
        <AddressItem label="Country" value={this.props.country} placeholder="" readonly="true" />
        </div></div>
      );
    }
  }

export default AddressInput;