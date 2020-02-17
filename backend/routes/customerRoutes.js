const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = require('../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/customer', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

router.post('/fetchAllProducts', (req, res) => {
    const {filter, name} = req.body
    if(filter == 'False') {
        Product.find({
            status: 'valid',
            readyToDispatch: false,
            dispatched: false
        }, (err, products) => {
            if(err) {
                return res.send({
                    success: 'False',
                    message: []
                })
            }
            return res.send({
                success: 'True',
                message: products
            })
        })
    } else if(filter == 'True') {
        Product.find({
            productName: name,
            status: 'valid',
            readyToDispatch: false,
            dispatched: false
        }, (err, products) => {
            if(err) {
                return res.send({
                    success: 'False',
                    message: []
                })
            }
            return res.send({
                success: 'True',
                message: products
            })
        })
    } else {
        return res.send({
            success: 'False',
            message: []
        })
    }
})

module.exports = router;
