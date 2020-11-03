const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/config')
const routes = require('./routes')
const bodyParser = require('body-parser')

const server = express()

mongoose.connect(
    config.module.connectionDB.url,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

server.use(bodyParser.json({limit: '50mb', extended: true}))
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)