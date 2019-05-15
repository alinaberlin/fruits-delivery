"use strict";
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/order", async (req, res, next) => {
    let userId = req.user._id;
    Order.find({ costumer: userId })
        .then(result => res.json(result))
        .catch(error => {
            res.status(500);
            res.json(error);
        });
});

router.get("/order/:id", async (req, res, next) => {
    Order.findById(req.params["id"])
        .then(result => res.json(result))
        .catch(error => {
            console.error("Error", error);
            res.status(404);
            res.json(error);
        });
});

router.post("/order", (req, res, next) => {
    const order = req.body;
    order.costumer = req.user._id;
    Order.create(order)
        .then(result => {
            console.log("order save", result);
            res.json(result);
        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(409);
            } else {
                res.status(400);
            }
            res.json(error);
        });
});

router.put("/order/:id", (req, res, next) => {
    const order = req.body;
    const id = req.params["id"];
    delete order._id;
    console.log("Order", order);
    Order.findByIdAndUpdate(id, { ...order })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(400);
            res.json(error);
        });
});

module.exports = router;
