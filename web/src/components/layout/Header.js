import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderLoginLogout = this.renderLoginLogout.bind(this);
        this.renderUserMenu = this.renderUserMenu.bind(this);
    }

    componentDidMount() {
        
    }

    logout() {
        localStorage.removeItem("user");
    }

    renderUserMenu() {
        if (this.props.isLoggedIn && !this.props.isLoggedIn.user.isAdmin) {
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
        } else if (this.props.isLoggedIn && this.props.isLoggedIn.user.isAdmin) {
            return (<Nav className="mr-auto">

                    <Nav.Link href="/orders">
                        <h4 style={{ color: "orange" }}>All Orders</h4>
                    </Nav.Link>
                    <Nav.Link href="/agenda">
                        <h4 style={{ color: "orange" }}>Agenda</h4>
                    </Nav.Link>
                </Nav>)
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
                <Nav className="inline">
                    <Nav.Link href="/me" className="login">
                        Profile
                    </Nav.Link>
                    <Nav.Link href="/login" className="login" onClick={this.logout}>
                        Logout
                    </Nav.Link>
                </Nav>
            );
        } else {
            return (
                <Nav className="inline">
                    <Nav.Link href="/register" className="login">
                        Register
                    </Nav.Link>
                    <Nav.Link href="/login" className="login">
                        Login
                    </Nav.Link>
                </Nav>
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
                        {this.renderLoginLogout()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default Header;
