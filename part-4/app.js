const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
} = require('./utils/middlewares')
const mongoose = require('mongoose')

const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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
app.use(tokenExtractor)

app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
