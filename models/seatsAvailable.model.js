const mongoose = require('mongoose')

const seatsAvailableSchema = new mongoose.Schema({
    seatType: {
        type: mongoose.Types.ObjectId,
        ref: 'SeatType',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    filled: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

seatsAvailableSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.createdAt
        delete returnedObject.updatedAt
    }
})

module.exports = mongoose.model('SeatsAvailable', seatsAvailableSchema)