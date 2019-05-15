import React from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Number from "./components/landing/Number";
import Landing from "./components/landing/Landing";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/signin/Login";
import Register from "./components/signin/Register";
import Map from "./components/Map";
import OrderEdit from "./components/OrderEdit";
import OrdersHistory from "./components/OrdersHistory";

function App() {
    const isLoggedIn = localStorage.getItem("token");
    return (
        <div className="App">
            <Header />
            <div className="container">
                <Number />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/map" component={Map} />
                    <Route
                        exact
                        path="/order"
                        render={props => {
                            return isLoggedIn ? <OrderEdit /> : <Redirect to="/login" />;
                        }}
                    />
                    <Route exact path="/orders" component={OrdersHistory} />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
