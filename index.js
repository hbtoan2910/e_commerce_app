const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const connectDb = require('./config/DatabaseConnection/db')
const UserRouter = require('./routers/UserRouter')

const port = process.env.PORT || 5000
const host = 'localhost'


const app = express()

app.get('/', (req, res) => {
    //res.sendFile('C:/Users/hbtoa/Desktop/e_commerce_app/test.html');
    //or
    //res.sendFile(__dirname + '/register.html');
    res.send('This is Home Page.')
})

app.use(express.json()); //MUST HAVE to handle JSON in req body

app.use('/user', UserRouter);

connectDb();

const server = app.listen(port, host, () => {
    console.log(`This server is listenning on http://${host}:${port} for connections...`)
})
