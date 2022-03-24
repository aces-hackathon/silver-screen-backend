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
        required: true,
    },
}, {
    timestamps: true,
})

seatTypeSchema.set('toJSON', (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
})

module.exports = mongoose.model('SeatType', seatTypeSchema)