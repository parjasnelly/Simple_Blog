const express = require('express')
const userRoutes = require('./user')
const homeRoutes = require('./homeRoutes')
const {route} = require("express/lib/router");
const api = express.Router()
api.use('/users', userRoutes)

const router = express.Router()

router.use('/api', api)
router.use('/', homeRoutes)

module.exports = router