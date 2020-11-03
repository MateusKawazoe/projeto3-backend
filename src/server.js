const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')

const server = express()

mongoose.connect(
    'mongodb+srv://admin:Amendobobo@urbanvg.qscz8.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

server.use(bodyParser.json({limit: '50mb', extended: true}))
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(process.env.PORT || 3333)