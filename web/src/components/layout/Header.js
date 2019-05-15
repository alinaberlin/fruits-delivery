import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderLoginLogout = this.renderLoginLogout.bind(this);
        this.renderUserMenu = this.renderUserMenu.bind(this);
    }

    logout() {
        localStorage.removeItem("token");
    }

    renderUserMenu() {
        if (this.props.isLoggedIn) {
            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/">
                        <h4 style={{ color: "orange" }}>About us</h4>
                    </Nav.Link>

                    <Nav.Link href="/orders">
                        <h4 style={{ color: "orange" }}>My Orders</h4>
                    </Nav.Link>
                    <Nav.Link href="/order">
                        <h4 style={{ color: "orange" }}>Order Now</h4>
                    </Nav.Link>
                </Nav>
            );
        } else {
            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/">
                        <h4 style={{ color: "orange" }}>About us</h4>
                    </Nav.Link>
                </Nav>
            );
        }
    }
    renderLoginLogout() {
        if (this.props.isLoggedIn) {
            return (
                <Nav.Link href="/login" className="login" onClick={this.logout}>
                    Logout
                </Nav.Link>
            );
        } else {
            return (
                <Nav.Link href="/login" className="login">
                    Login
                </Nav.Link>
            );
        }
    }
    render() {
        return (
            <div>
                <Navbar bg="success" expand="lg" fixed="top">
                    <Navbar.Brand href="/">
                        <h1 className="fruits">Happy Fruits</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {this.renderUserMenu()}
                        <Nav className="inline">{this.renderLoginLogout()}</Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default Header;
