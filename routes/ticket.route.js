ticketRouter = require('express').Router()
const mongoose = require('mongoose')

const Ticket = require('../models/ticket.model')

ticketRouter.post('/', async (req, res) => {
    const body = req.body

    const newTicket = new Ticket({
        user: mongoose.Types.ObjectId(body.user),
        show: mongoose.Types.ObjectId(body.show),
        seatType: mongoose.Types.ObjectId(body.seatType),
        seatCount: Number(body.seatCount),
        amount: Number(body.amount),
    })

    const savedTicket = await newTicket.save()
    res.json(savedTicket)
})

ticketRouter.get('/', async (req, res) => {
    const tickets = await Ticket
        .find({})
        .populate('user')
        .populate('show')
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(tickets.map(u => u.toJSON()))
})

ticketRouter.get('/:id', async (req, res) => {
    const ticket = await Ticket
        .findById(req.params.id)
        .populate('user')
        .populate('show')
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(ticket.toJSON())
})

ticketRouter.post('/:id', async (req, res) => {
    const body = req.body

    const toUpdate = {
        show: mongoose.Types.ObjectId(body.show),
        seatType: mongoose.Types.ObjectId(body.seatType),
        seatCount: Number(body.seatCount),
        amount: Number(body.amount),
    }

    const updatedTicket = await Ticket
        .findByIdAndUpdate(req.params.id, toUpdate)
        .populate('user')
        .populate('show')
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(updatedTicket)
})

ticketRouter.delete('/:id', async (req, res) => {
    const deletedTicket = await Ticket
        .findByIdAndDelete(req.params.id)
        .populate('user')
        .populate('show')
        .populate({
            path: 'seatType',
            populate: { path: 'theatre' },
        })

    res.json(deletedTicket)
})

module.exports = ticketRouter