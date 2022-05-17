const seatTypeRouter = require('express').Router()
const mongoose = require('mongoose')

const SeatType = require('../models/seatType.model')

seatTypeRouter.post('/', async (req, res) => {
    const newSeatType = new SeatType({
        name: req.body.name,
        rate: Number(req.body.rate),
        theatre: mongoose.Types.ObjectId(req.body.theatre),
    })

    const savedSeatType = await newSeatType.save()
    res.json(savedSeatType.toJSON())
})

seatTypeRouter.get('/', async (req, res) => {
    const seatTypes = await SeatType
        .find({})
        .populate('theatre')

    res.json(seatTypes.map(u => u.toJSON()))
})

seatTypeRouter.get('/:id', async (req, res) => {
    const seatType = await SeatType
        .findById(req.params.id)
        .populate('theatre')

    res.json(seatType.toJSON())
})

seatTypeRouter.post('/:id', async (req, res) => {
    const body = req.body

    const toUpdate = {
        name: req.body.name,
        rate: Number(req.body.rate),
    }

    const updatedSeatType = await SeatType
        .findByIdAndUpdate(req.params.id, toUpdate)
        .populate('theatre')

    res.json(updatedSeatType.toJSON())
})

seatTypeRouter.delete('/:id', async (req, res) => {
    const deletedSeatType = await SeatType
        .findByIdAndDelete(req.params.id)
        .populate('theatre')

    res.json(deletedSeatType)
})

seatTypeRouter.delete('/', async (req, res) => {
    await SeatType.deleteMany({})

    res.json({ message: 'Deleted all seat types' })
})

module.exports = seatTypeRouter