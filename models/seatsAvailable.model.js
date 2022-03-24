const mongoose = require('mongoose')

const seatsAvailableSchema = new mongoose.Schema({
    show: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    seatType: {
        type: mongoose.Types.ObjectId,
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

seatsAvailableSchema.set('toJSON', (document, returnedOBject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
})

module.exports = mongoose.model('SeatsAvailable', seatsAvailableSchema)