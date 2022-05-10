const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const connectDb = require('./config/DatabaseConnection/db')

const port = process.env.PORT || 5000
const host = 'localhost'


const app = express()

app.get('/', (req, res) => {
    res.send('This is home page')
})

connectDb();

const server = app.listen(port, host, () => {
    console.log(`This server is listenning on http://${host}:${port} for connections...`)
})
