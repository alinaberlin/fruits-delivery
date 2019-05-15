import React, { Component } from "react";

const HERE_APP_ID = "sTWYdO0PrgRXmMm1ViBr";
const HERE_APP_CODE = "IdqCe27szfQfJ9i4z5Zq6Q";

class Map extends Component {
    constructor(props) {
        super(props);

        this.platform = null;
        this.map = null;

        this.state = {
            app_id: HERE_APP_ID,
            app_code: HERE_APP_CODE,
            center: {
                lat: 52.518392,
                lng:  13.428983
               
            },
            zoom: 12,
            theme: "normal.day",
            style: "default",
            shape: [{ lat: 52.526448, lng: 13.447607 }, { lat: 52.5157921, lng: 13.453692 }, { lat: 52.518993, lng: 13.428332 }]
        };
    }

    // TODO: Add theme selection discussed later HERE
    addPolyline() {
        if (this.state.shape.length > 2) {
            let lineString = new window.H.geo.LineString();
             this.state.shape.forEach(point => lineString.pushPoint(point))
            this.map.addObject(new window.H.map.Polyline(lineString, { style: { lineWidth: 4 } }));
        }
    }
    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);

        var layer = this.platform.createDefaultLayers();
        var container = document.getElementById("here-map");

        this.map = new window.H.Map(container, layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom
        });
        this.addPolyline()
        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        var behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map, layer);
    }

    render() {
        return <div id="here-map" style={{ width: "100%", height: "400px", background: "grey" }} />;
    }
}

export default Map;
