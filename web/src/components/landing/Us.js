import React from "react";
import { Button, Collapse } from "react-bootstrap";

class Us extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            caca: false,
            tata: false

        };
    }

    render() {
        const { open, caca, tata } = this.state;
        return (
            <>
                <div>
                    <Button onClick={() => this.setState({ open: !open })} aria-controls="example-collapse-text" aria-expanded={open}>
                        click
                    </Button>
                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text">
                            Setting up an account and getting started could not be easier. You can either use our online ordering process (go to
                            "order fruit now"), reach us through our "contact us" page, or simply call us on 088 - 06 40 100. Ordering fruit is not
                            like buying stationary for your office: there are numerous options available to you in terms of order quantity, delivery
                            days and order splits. So please get in touch with us if you would like to discuss your needs. We have helped thousands of
                            clients to implement a successful office fruit delivery service.
                        </div>
                    </Collapse>
                </div>
                <div>
                    <Button onClick={() => this.setState({ caca: !caca })} aria-controls="example-collapse-text" aria-expanded={open}>
                        click
                    </Button>
                    <Collapse in={this.state.caca}>
                        <div id="example-collapse-text">
                            Setting up an account and getting started could not be easier. You can either use our online ordering process (go to
                            "order fruit now"), reach us through our "contact us" page, or simply call us on 088 - 06 40 100. Ordering fruit is not
                            like buying stationary for your office: there are numerous options available to you in terms of order quantity, delivery
                            days and order splits. So please get in touch with us if you would like to discuss your needs. We have helped thousands of
                            clients to implement a successful office fruit delivery service.
                        </div>
                    </Collapse>
                </div>
                <div>
                    <Button onClick={() => this.setState({ tata: !tata })} aria-controls="example-collapse-text" aria-expanded={open}>
                        click
                    </Button>
                    <Collapse in={this.state.tata}>
                        <div id="example-collapse-text">
                            Setting up an account and getting started could not be easier. You can either use our online ordering process (go to
                            "order fruit now"), reach us through our "contact us" page, or simply call us on 088 - 06 40 100. Ordering fruit is not
                            like buying stationary for your office: there are numerous options available to you in terms of order quantity, delivery
                            days and order splits. So please get in touch with us if you would like to discuss your needs. We have helped thousands of
                            clients to implement a successful office fruit delivery service.
                        </div>
                    </Collapse>
                </div>
                
            </>
        );
    }
}

export default Us;
