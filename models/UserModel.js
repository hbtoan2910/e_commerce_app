const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    address: {type: String},
    phone: {type: String},
    isAdmin: {type: Boolean}
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;