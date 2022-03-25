const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const userRouter = require('./routes/user.route')
const loginRouter = require('./routes/login.route')
const theatreRouter = require('./routes/theatre.route')

const app = express()

//Connecting to mongoDB
logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

//Middlewares
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('<p>Silver screen backend api</p>')
})

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/theatres', theatreRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app