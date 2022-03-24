const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
    },
    timing: {
        type: Date,
        required: true,
    },
    screenNo: {
        type: Number,
        required: true,
    },
    ticketRate: {
        type: Number,
        required: true,
    },
    isRunning: {
        type: Boolean
    },
    seatsAvailable: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'SeatsAvailable',
        },
    ],
})

showSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Show', showSchema)