const mongoose = require('mongoose')

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

theatreSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.createdAt
        delete returnedObject.updatedAt
    }
})

module.exports = mongoose.model('Theatre', theatreSchema)