const mongoose = require('mongoose')

let VendorSchema = new mongoose.Schema({
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
    },
    rating: {
        type: Number,
        default: 3,
        required: true,
    },
    noOfReviews: {
        type: Number,
        default: 1,
        required: true
    }
})

module.exports = mongoose.model('Vendor', VendorSchema)