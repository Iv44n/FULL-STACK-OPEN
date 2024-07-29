const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const cors = require('cors')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)

module.exports = app
