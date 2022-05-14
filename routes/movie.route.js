movieRouter = require('express').Router()

const Movie = require('../models/movie.model')

movieRouter.post('/', async (req, res) => {
    const body = req.body

    const newMovie = new Movie({
        name: body.name,
        poster: body.poster,
        trailer: body.trailer,
        cast: body.cast,
        description: body.description,
        rating: body.rating
    })

    const savedMovie = await newMovie.save()
    res.json(savedMovie.toJSON())
})

movieRouter.get('/', async (req, res) => {
    const movies = await Movie
        .find({})

    res.json(movies.map(u => u.toJSON()))
})

module.exports = movieRouter