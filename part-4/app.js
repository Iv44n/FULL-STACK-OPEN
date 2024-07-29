const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const {
  requestLogger,
  unknownEndpoint,
  errorHandler
} = require('./utils/middlewares')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const cors = require('cors')
const logger = require('./utils/logger')

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
