"use strict";
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const moment = require("moment");
const nodemailer = require("nodemailer");

router.get("/order", async (req, res, next) => {
    let userId = req.user._id;
    Order.find({ costumer: userId })
        .then(result => res.json(result))
        .catch(error => {
            res.status(500);
            res.json(error);
        });
});

router.get("/orders", async (req, res, next) => {
    const query = {};

    if (req.query.date) {
        const start = moment(req.query.date)
            .startOf("day")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        const end = moment(req.query.date)
            .endOf("day")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        query.date = { $gte: start, $lt: end };
    }

    Order.find(query)
        .populate({
            path: "costumer"
        }).then(result => res.json(result))
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
            User.findById(req.user._id).then(user => {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secureConnection: false, // true for 465, false for other ports
                    auth: {
                        user: "happyfruitsironhack@gmail.com", // generated ethereal user
                        pass: "Coucou12" // generated ethereal password
                    }
                });

                transporter.sendMail({
                    from: "happyfruitsironhack@gmail.com", // sender address
                    to: user.email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: `Your order has been received, at ${result.date} will receive you order in ${result.quantity }. Hope you enjoy it.`, // plain text body
                    html: "<b>Thank you for buying fruits from us! Your order has been received, it will be dispatched shortly</b>" // html body
                });
            });
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

router.get("/me", (req, res, next) => {
    res.json(req.user);
});

router.put("/order/:id", (req, res, next) => {
    const order = req.body;
    const id = req.params["id"];

    delete order._id;

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
