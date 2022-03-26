const seatsAvailableRouter = require('express').Router()
const mongoose = require('mongoose')

const SeatsAvailable = require('../models/seatsAvailable.model')

seatsAvailableRouter.post('/', async (req, res) => {
    const body = req.body

    const newSeatsAvailable = new SeatsAvailable({
        seatType: mongoose.Types.ObjectId(body.seatType),
        total: Number(body.total),
        filled: body.filled
            ? Number(body.filled)
            : 0
    })

    const savedSeatsAvailable = await newSeatsAvailable.save()
    res.json(savedSeatsAvailable.toJSON())
})

seatsAvailableRouter.get('/', async (req, res) => {
    const seatsAvailable = await SeatsAvailable
        .find({})
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(seatsAvailable.map(u => u.toJSON()))
})

seatsAvailableRouter.get('/:id', async (req, res) => {
    const seatsAvailable = await SeatsAvailable
        .findById(req.params.id)
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(seatsAvailable.toJSON())
})

seatsAvailableRouter.post('/:id', async (req, res) => {
    const body = req.body
    
    const toUpdate = {
        total: Number(body.total),
        filled: Number(body.filled),
    }

    const updatedSeatsAvailabe = await SeatsAvailable
        .findByIdAndUpdate(req.params.id, toUpdate)
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(updatedSeatsAvailabe)
})

seatsAvailableRouter.delete('/:id', async (req, res) => {
    const deletedSeatsAvailable = await SeatsAvailable
        .findByIdAndDelete(req.params.id)
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(deletedSeatsAvailable)
})

module.exports = seatsAvailableRouter