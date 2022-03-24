const mongoose = require('mongoose')

paymentSchema = new mongoose.Schema({
    ticket: {
        type: mongoose.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    paymentType: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
    }
}, {
    timestamps: true,
})

paymentSchema.set('toJSON', (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
})

module.exports = mongoose.model('Payment', paymentSchema)