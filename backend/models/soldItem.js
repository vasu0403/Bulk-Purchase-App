const mongoose = require('mongoose')

let SoldItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: '',
        required: true
    },
    customerEmail: {
        type: String,
        default: '',
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    reviewed: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('SoldItem', SoldItemSchema)

