const mongoose = require('mongoose')

let Customer = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
        required: true
    },
    lastName: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: '',
        required: true
    }
})

module.exports = mongoose.model('Customer', Customer)