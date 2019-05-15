const express = require("express");
const router = express.Router();

const Agenda = require('../models/Agenda')

router.post('/agenda', (req, res, next) => {
    const user = req.body
    Agenda.create(agenda).then(result => {
        console.log("agenda save", result)
        res.json(result)
    }).catch(error => {
        if (error.code === 11000) {
            res.status(409)
        } else {
            res.status(400)
        }
        res.json(error)
    })
})

module.exports = router;