const showRouter = require('express').Router()
const mongoose = require('mongoose')

const Show = require('../models/show.model')
const SeatsAvailable = require('../models/seatsAvailable.model')

showRouter.post('/', async (req, res) => {
    const body = req.body

    const newShow = new Show({
        movieName: body.movieName,
        timing: Date(body.timing),
        screenNo: Number(body.screenNo),
        isRunning: body.isRunning
            ? body.isRunning
            : true,
        seatsAvailable: mongoose.Types.ObjectId(body.seatsAvailable),
    })

    const savedShow = await newShow.save()
    res.json(savedShow.toJSON())
})

//Full populate not working yet
showRouter.get('/', async (req, res) => {
    const shows = await Show
        .find({})
        .populate({
            path: 'seatsAvailable',
            // populate: {
            //     path: {
            //         path: 'seatsAvailabeseatType',
            //         populate: { path: 'theatre' },
            //     },
            // },
        })

    res.json(shows.map(u => u.toJSON()))
})

showRouter.get('/:id', async (req, res) => {
    const show = await Show
        .findById(req.params.id)
        .populate({
            path: 'seatsAvailable',
            // populate: {
            //     path: {
            //         path: 'seatType',
            //         populate: { path: 'theatre' },
            //     },
            // },
        })

    res.json(show.toJSON())
})

// showRouter.post('/:id', async (req, res) => {
    
// })

showRouter.delete('/:id', async (req, res) => {
    const deletedShow = await Show
        .findByIdAndDelete(req.params.id)
        .populate({
            path: 'seatsAvailable',
            // populate: {
            //     path: {
            //         path: 'seatType',
            //         populate: { path: 'theatre' },
            //     },
            // },
        })

    res.json(deletedShow)
})

module.exports = showRouter