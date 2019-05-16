import React, { Component } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { Form, Table } from 'react-bootstrap';
import Moment from "moment";

const HERE_APP_ID = 'sTWYdO0PrgRXmMm1ViBr';
const HERE_APP_CODE = 'IdqCe27szfQfJ9i4z5Zq6Q';

const svgMarkup = '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#5e5370" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">C</text></svg>';

export default class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            orders: [],
            markers: [],
            app_id: HERE_APP_ID,
            app_code: HERE_APP_CODE,
            center: {
                lat: 52.518392,
                lng: 13.428983,
            },
            zoom: 12,
            theme: 'normal.day.grey',
            style: 'default'
        };
        this.onChange = this.onChange.bind(this);
        this.platform = null;
        this.map = null;
    }

    changeTheme() {
        var tiles = this.platform.getMapTileService({ 'type': 'base' });
        var layer = tiles.createTileLayer(
            'maptile',
            this.state.theme,
            256,
            'png',
            { 'style': this.state.style }
        );
        this.map.setBaseLayer(layer);
    }

    addMarkers() {
        console.log('Add markers');
        if (this.state.markers) {
            this.state.markers.forEach(point => {
                console.log('Add one marker');
                console.log('Point', point);
                const loc = {
                    lat: point.lat,
                    lng: point.lon
                }
                const icon = new window.H.map.Icon(svgMarkup);
                const marker = new window.H.map.Marker(loc, { icon: icon });
                this.map.addObject(marker);
            })
        }
    }

    addPolyline() {
        if (this.state.shape && this.state.shape.length > 2) {
            let lineString = new window.H.geo.LineString();
            this.state.shape.forEach(point => lineString.pushPoint(point))
            this.map.addObject(new window.H.map.Polyline(
                lineString, { style: { lineWidth: 4 } }
            ));
        }
    }

    componentDidMount() {
        this.drawMap();
    }

    drawMap() {
        this.platform = new window.H.service.Platform(this.state);

        let layer = this.platform.createDefaultLayers();
        let container = document.getElementById('here-map');
        container.innerHTML = '';
        this.map = new window.H.Map(container, layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
        })
        this.changeTheme();
        this.addPolyline();
        this.addMarkers();
        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        var behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map, layer)
    }

    onChange(event) {
        event.preventDefault();
        const state = this.state;
        state.date = event.target.value;
        const url = `${API_URL}/api/orders?date=${Moment(state.date).format("YYYY-MM-DD")}`
        const options = {
            method: "get",
            headers: { "content-type": "application/json", authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
            url
        };
        const self = this;
        axios(options)
            .then(res => {
                state.orders = res.data;
                state.markers = [];
                state.shape = [];
                const coords = JSON.parse(localStorage.getItem('user')).user.address.coords;
                const startEnd = `${coords.lat},${coords.lon}`;
                const params = {
                    app_id: HERE_APP_ID,
                    app_code: HERE_APP_CODE,
                    start: startEnd,
                    end: startEnd,
                    mode: 'fastest;car'
                }
                let counter = 1;
                res.data.forEach(el => {
                    state.markers.push(el.costumer.address.coords)
                    params[`destination${counter}`] = `${el.costumer.address.coords.lat},${el.costumer.address.coords.lon}`
                    counter++
                });

                axios.get('https://wse.api.here.com/2/findsequence.json', {
                    params
                }).then(res => {
                    const waypoints = res.data.results[0].waypoints;
                    let counter = 0;
                    const parameters = {
                        mode: 'fastest;car;traffic:enabled',
                        departure: 'now'
                    }
                    waypoints.forEach(el => {
                        parameters[`waypoint${counter}`] = `${el.lat},${el.lng}`
                        counter++
                    })
                    const router = self.platform.getRoutingService();
                    router.calculateRoute(parameters,
                        (result) => {
                            console.log(result);
                            result.response.route[0].leg.forEach(el => {
                                el.maneuver.forEach(m => {
                                    state.shape.push({lat: m.position.latitude, lng: m.position.longitude})
                                })
                            })
                            self.setState(state);
                            self.drawMap();
                        }, (error) => {
                            console.error(error);
                        })

                })

            })
            .catch(e => {
                console.log("Error", e);
            });

    }

    render() {
        return (
            <div className="content formClass">
                <Form>
                    <Form.Group controlId="forDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} onChange={this.onChange} required />
                    </Form.Group>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Payment method</th>
                            <th>Payed</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{Moment(order.date).format("YYYY-MM-DD")}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.method}</td>
                                    <td>{order.isPayed ? "Yes" : "No"}</td>
                                    <td>{order.costumer.firstName} {order.costumer.lastName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div id="here-map" style={{ width: '100%', height: '400px', background: 'grey' }} />
            </div>
        );
    }
}
