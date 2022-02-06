const express = require('express')
const app = express()

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('<p>Silver screen backend api</p>')
})

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app