"use strict";

const { httpServer } = require("./src/app");

const port = process.env.PORT || 3001;

httpServer.listen(port, () => {
    console.log("Example app listening on port 443! Go to http://localhost:3001/");
});
