import React, { Component } from "react";

class AddressSuggest extends Component {
    render() {
        return (
            <div className="row form-group justify-content-start">
                <label className="col-sm-4 col-form-label">Address</label>
                <div className="col-xl-8">
                    <input
                        type="text"
                        value={this.props.query}
                        defaultValue={this.props.value}
                        onChange={this.props.onChange}
                        onBlur={this.props.onCheck}
                        className="form-control"
                        placeholder="start typing"
                    />
                </div>
            </div>
        );
    }
}

export default AddressSuggest;
