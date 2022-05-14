const mongoose = require('mongoose')

movieSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
    },
    cast: [
        {
            actorName: String,
            actorPhoto: String
        }
    ],
    description: {
        type: String,
        minlength: 10,
        maxlength: 1000
    },
    rating: {
        type: Number
    }
})