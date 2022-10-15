const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000
const host = 'localhost'
const app = express()

const connectDb = require('./config/DatabaseConnection/db')

const UserRouter = require('./routers/UserRouter')
const ProductRouter = require('./routers/ProductRouter')
const OrderRouter = require("./routers/OrderRouter.js")
const ChatRouter = require("./routers/ChatRouter.js")
const PaymentRouter = require("./routers/PaymentRouter.js")
const SelectListRouter = require("./routers/SelectListRouter.js")
const ListTypeProductRouter = require("./routers/ListTypeProductRouter.js")

app.get('/', (req, res) => {
    //res.sendFile('C:/Users/hbtoa/Desktop/e_commerce_app/test.html');
    //or
    //res.sendFile(__dirname + '/register.html');
    res.send('This is Home Page.')
})

app.use(express.json()); //MUST HAVE to handle JSON in req body

pp.use('/products', ProductRouter)
app.use('/user', UserRouter)
app.use('/order', OrderRouter)
app.use('/chat', ChatRouter)
app.use('/payment', PaymentRouter)
app.use('/selectList', SelectListRouter)
app.use('/typeList', ListTypeProductRouter)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
connectDb();

const server = app.listen(port, host, () => {
    console.log(`This server is listenning on http://${host}:${port} for connections...`)
})
