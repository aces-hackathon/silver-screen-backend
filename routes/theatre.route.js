const theatreRouter = require('express').Router()
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const Theatre = require('../models/theatre.model')
const { getTokenFrom } = require('./reqHelper')

theatreRouter.post('/', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)

    const newTheatre = new Theatre({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        password: hash,
    })

    const savedTheatre = await newTheatre.save()
    res.json(savedTheatre)
})

theatreRouter.get('/', async (req, res) => {
    const theatres = await Theatre
        .find({})

    res.json(theatres.map(u => u.toJSON()))
})

theatreRouter.get('/:id', async (req, res) => {
    const theatre = await Theatre
        .findById(req.params.id)

    if (!theatre) {
        return res.status(400).json({
            error: 'No theatres found'
        })
    }

    res.json(theatre.toJSON())
})

theatreRouter.get('/phone/:phone', async (req, res) => {
    // const token = getTokenFrom(req)

    // const decodedToken = jwt.verify(token, process.env.SECRET)

    // if (!token || !decodedToken) {
    //     return res.status(401).json({ error: 'token missing or invalid' })
    // }

    const theatre = await Theatre
        .findOne({ phone: req.params.phone })

    res.json(theatre.toJSON())
})

//Update test pending

module.exports = theatreRouter