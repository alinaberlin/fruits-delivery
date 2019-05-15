import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const Header = () => {
    return (
        <div>
            <Navbar bg="success" expand="lg" fixed="top">
                <Navbar.Brand href="/">
                    <h1 className="fruits">Happy Fruits</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">
                            <h4 style={{ color: "orange" }}>About us</h4>
                        </Nav.Link>
                    </Nav>
                    <Nav className="inline">
                        <Nav.Link href="/login" className="login">
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
export default Header;
