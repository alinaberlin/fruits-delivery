import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderLoginLogout = this.renderLoginLogout.bind(this);
        this.renderUserMenu = this.renderUserMenu.bind(this);
    }

    componentDidMount() {}

    logout() {
        localStorage.removeItem("user");
    }

    renderUserMenu() {
        if (this.props.isLoggedIn && !this.props.isLoggedIn.user.isAdmin) {
            return (
                <Nav className="mr-auto">
                    <Link to="/">
                        <h4 style={{ color: "orange" }}>About us</h4>
                    </Link>

                    <Link to="/orders">
                        <h4 style={{ color: "orange" }}>My Orders</h4>
                    </Link>
                    <Link to="/order">
                        <h4 style={{ color: "orange" }}>Order Now</h4>
                    </Link>
                </Nav>
            );
        } else if (this.props.isLoggedIn && this.props.isLoggedIn.user.isAdmin) {
            return (
                <Nav className="mr-auto">
                    <Link to="/orders">
                        <h4 style={{ color: "orange" }}>All Orders</h4>
                    </Link>
                    <Link to="/agenda">
                        <h4 style={{ color: "orange" }}>Agenda</h4>
                    </Link>
                </Nav>
            );
        } else {
            return (
                <Nav className="mr-auto">
                    <Link to="/">
                        <h4 style={{ color: "orange" }}>About us</h4>
                    </Link>
                </Nav>
            );
        }
    }
    renderLoginLogout() {
        if (this.props.isLoggedIn) {
            return (
                <Nav className="inline">
                    <Link to="/me" className="login">
                        Profile
                    </Link>
                    <Link to="/login" className="login" onClick={this.logout}>
                        Logout
                    </Link>
                </Nav>
            );
        } else {
            return (
                <Nav className="inline">
                    <Link to="/register" className="login">
                        Register
                    </Link>
                    <Link to="/login" className="login">
                        Login
                    </Link>
                </Nav>
            );
        }
    }
    render() {
        return (
            <div>
                <Navbar bg="success" expand="lg" fixed="top">
                    <Navbar.Brand to="/">
                        <h1 className="fruits">Happy Fruits</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {this.renderUserMenu()}
                        {this.renderLoginLogout()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default Header;
