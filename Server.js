const express = require('express')
const api = require('./server/routes/api')
const path = require('path')
const app = express()
require('dotenv').config()
const {PORT} = process.env

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)


app.listen(PORT, function () {
    console.log(`Running server on port ${PORT}`)
})