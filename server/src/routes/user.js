const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/user", (req, res, next) => {
    const user = req.body;
    console.log(req.body);
    User.create(user)
        .then(result => {
            console.log("user save", result);
            res.json(result);
        })
        .catch(error => {
            console.log(error);
            if (error.code === 11000) {
                res.status(409);
            } else {
                res.status(400);
            }
            res.json(error);
        });
});

module.exports = router;
