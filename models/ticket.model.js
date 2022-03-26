const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    show: {
        type: mongoose.Types.ObjectId,
        ref: 'Show',
        required: true,
    },
    seatType: {
        type: mongoose.Types.ObjectId,
        ref: 'SeatType',
        required: true,
    },
    seatCount: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

ticketSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.createdAt
        delete returnedObject.updatedAt
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)