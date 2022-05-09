const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const port = process.env.port || 5000;
const host = 'localhost';

const app = express();
const server = http.createServer((req, res) => {
    res.send("This is homepage");
});

app.listen(port, host, () => {
    console.log(`This server is listenning on http://${host}:${port} for connections...`)
});
