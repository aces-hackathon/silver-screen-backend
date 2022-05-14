const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    city: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
        },
    ],
}, {
    timestamps: true
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.createdAt
        delete returnedObject.updatedAt
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User', userSchema)