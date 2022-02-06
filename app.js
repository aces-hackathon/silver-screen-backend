const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('<p>Silver screen backend api</p>')
})

module.exports = app