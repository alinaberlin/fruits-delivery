"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const mongoConnectURI = process.env.MONGOURL || "mongodb://localhost/fruits-delivery";
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const auth = require("./routes/auth");
const securedRoutes = require("./routes/secured-routes");
require("./auth/passport");

const HERE_APP_ID = "sTWYdO0PrgRXmMm1ViBr";
const HERE_APP_CODE = "IdqCe27szfQfJ9i4z5Zq6Q";
mongoose
    .connect(mongoConnectURI, { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", user);
app.use("/api", passport.authenticate("jwt", { session: false }), securedRoutes);
app.use("/auth", auth);
app.get("/", (req, res) => res.json({ greeting: "Hello World!" }));

// generate certificates: openssl req -nodes -new -x509 -keyout server.key -out server.cert
const httpServer = http.createServer(app);

const wss = new WebSocket.Server({
    server: httpServer
});

module.exports = {
    httpServer
};
