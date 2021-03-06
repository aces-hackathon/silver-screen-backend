//https://dry-meadow-32049.herokuapp.com/

const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT || 5000, () => {
    logger.info(`Server listening on port ${config.PORT}`)
})