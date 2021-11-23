const express = require('express')
const userRoutes = require('./user')
const homeRoutes = require('./homeRoutes')

const api = express.Router()
api.use('/users', userRoutes)

const route = express.Router()

route.use('/api', api)
route.use('/', homeRoutes)

module.exports = route