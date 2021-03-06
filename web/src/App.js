import React, { Component } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
//import Number from "./components/landing/Number";
import Landing from "./components/landing/Landing";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/signin/Login";
import Register from "./components/signin/Register";
import Map from "./components/Map";
import OrderEdit from "./components/OrderEdit";
import OrdersHistory from "./components/OrdersHistory";
import CardPayment from "./components/paymentMethod/CardPayment";
import Profile from "./components/user/Profile";
import Agenda from "./components/Agenda";
import Us from './components/landing/Us'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: JSON.parse(localStorage.getItem("user")) };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.setState({ isLoggedIn: JSON.parse(localStorage.getItem("user")) });
    }
    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/us" component={Us} />
                        <Route exact path="/login" render={props => <Login {...props} handleLogin={this.handleLogin} />} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/map" component={Map} />
                        <Route
                            exact
                            path="/cardpayment/:orderId"
                            render={props => {
                                return this.state.isLoggedIn ? <CardPayment {...props} /> : <Redirect to="/login" />;
                            }}
                        />

                        <Route
                            exact
                            path="/me"
                            render={props => {
                                return this.state.isLoggedIn ? <Profile {...props} token={this.state.isLoggedIn} /> : <Redirect to="/login" />;
                            }}
                        />

                        <Route
                            exact
                            path="/order"
                            render={props => {
                                return this.state.isLoggedIn ? <OrderEdit {...props} /> : <Redirect to="/login" />;
                            }}
                        />
                        <Route
                            exact
                            path="/order/:id"
                            render={props => {
                                return this.state.isLoggedIn ? <OrderEdit {...props} /> : <Redirect to="/login" />;
                            }}
                        />
                        <Route
                            exact
                            path="/orders"
                            render={props => {
                                return this.state.isLoggedIn ? <OrdersHistory {...props} /> : <Redirect to="/login" />;
                            }}
                        />
                        <Route
                            exact
                            path="/agenda"
                            render={props => {
                                return this.state.isLoggedIn ? <Agenda {...props} /> : <Redirect to="/login" />;
                            }}
                        />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
