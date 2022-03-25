const mongoose = require('mongoose')

const seatTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    theatre: {
        type: mongoose.Types.ObjectId,
        ref: 'Theatre',
        required: true,
    },
}, {
    timestamps: true,
})

seatTypeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.createdAt
        delete returnedObject.updatedAt
    }
})

module.exports = mongoose.model('SeatType', seatTypeSchema)