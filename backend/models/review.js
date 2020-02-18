const mongoose = require('mongoose')

let ReviewSchema = new mongoose.Schema({
    productName: {
        type: String,
        default: '',
        required: true
    },
    productId: {
        type: String,
        default: '',
        required: true
    },
    vendorEmail: {
        type: String,
        default: '',
        required: true
    },
    customerEmail: {
        type: String,
        default: '',
        required: true
    },
    review: {
        type: String,
        default: '',
        required: true
    }
})

module.exports = mongoose.model('Review', ReviewSchema)