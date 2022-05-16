const showRouter = require('express').Router()
const mongoose = require('mongoose')

const Show = require('../models/show.model')
const SeatType = require('../models/seatType.model')
const Theatre = require('../models/theatre.model')

const waitPromise = async promises => {
    return Promise.all(promises)
}

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
            //         path: 'seatType',
            //         model: 'SeatType',
            //         // populate: { path: 'theatre' },
            //     },
            // },
        })

    //Deep populate
    for(let i=0; i<shows.length; i++){
        for(j=0; j<shows[i].seatsAvailable.length; j++) {
            shows[i].seatsAvailable[j].seatType = await SeatType
                .findById(shows[i].seatsAvailable[j].seatType)

            // console.log(shows[i].seatsAvailable.seatType)
            if (shows[i].seatsAvailable[j].seatType !== null) {
                console.log(shows[i].seatsAvailable[j].seatType.theatre)
                shows[i].seatsAvailable[j].seatType.theatre = await Theatre
                    .findById(shows[i].seatsAvailable[j].seatType.theatre)
            }
        }
    }

        /*
        seattypes array
        rate
        timing
        theatre
        */

    res.json(shows.map(u => u.toJSON()))
})

showRouter.get('/minimized', async (req, res) => {
    const shows = await Show
        .find({})
        .populate({
            path: 'seatsAvailable',
        })

    //Deep populate
    for(let i=0; i<shows.length; i++){
        for(j=0; j<shows[i].seatsAvailable.length; j++) {
            shows[i].seatsAvailable[j].seatType = await SeatType
                .findById(shows[i].seatsAvailable[j].seatType)

            // console.log(shows[i].seatsAvailable.seatType)
            if (shows[i].seatsAvailable[j].seatType !== null) {
                console.log(shows[i].seatsAvailable[j].seatType.theatre)
                shows[i].seatsAvailable[j].seatType.theatre = await Theatre
                    .findById(shows[i].seatsAvailable[j].seatType.theatre)
            }
        }
    }

    mappedShows = shows.map(u => u.toJSON())
    
    const minimizedShows = mappedShows.map(show => {
        return {
            id: show.id,
            movieName: show.movieName,
            screenNo: show.screenNo,
            seatType: show.seatsAvailable.length === 0
                ? null
                : show.seatsAvailable.map(obj => {
                    return {
                        name: obj.seatType ? obj.seatType.name : null,
                        rate: obj.seatType ? obj.seatType.rate : null,
                        id: obj.seatType ? obj.seatType.id : null,
                    }
                }),
            theatre: (show.seatsAvailable.length === 0 || show.seatsAvailable[0].seatType == null || show.seatsAvailable[0].seatType.theatre == null)
                ? null
                : show.seatsAvailable[0].seatType.theatre.id
            
        }
    })

    res.json(minimizedShows)
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