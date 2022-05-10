const { UserModel } = require('./models/UserModel.js')

const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    isAdmin: false,
})

