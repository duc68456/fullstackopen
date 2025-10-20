const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

const app = express()

logger.info('connecting to', config.mongoUrl)

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info('connected to', config.mongoUrl)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB', error)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app