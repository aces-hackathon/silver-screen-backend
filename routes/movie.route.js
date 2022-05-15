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
        rating: body.rating,
        genre: body.genre,
        language: body.language
    })

    const savedMovie = await newMovie.save()
    res.json(savedMovie.toJSON())
})

movieRouter.get('/', async (req, res) => {
    const movies = await Movie
        .find({})

    res.json(movies.map(u => u.toJSON()))
})

movieRouter.get('/one', async (req, res) => {
    const movie = await Movie.findOne({
        name: req.body.name
    })

    if (!movie) {
        return res.status(401).json({
            error: 'Movie not found'
        })
    }

    res.json(movie.toJSON())
})

module.exports = movieRouter