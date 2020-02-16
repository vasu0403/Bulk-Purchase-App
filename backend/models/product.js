const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        default: '',
        required: true
    },
    vendorEmail: {
        type: String,
        default: '',
        required: true
    },
    status: {
        type: String,
        default: 'valid',
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    total: {
        type: Number,
        default: 0,
        required: true
    },
    available: {
        type: Number,
        defaut: 0,
        required: true
    },
    readyToDispatch: {
        type: Boolean,
        default: false,
        requried: true
    },
    dispatched: {
        type: Boolean,
        default: false,
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)