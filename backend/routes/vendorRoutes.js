const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = require('../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/customer', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

router.post('/addProducts', (req, res) => {
    // console.log(req.body)
    const {vendorEmail, status, price, total, available, readyToDispatch, dispatched, productName} = req.body
    if(!vendorEmail) {
        return res.send({
            success: 'False',
            message: 'Missing vendor email'
        })
    }
    if(!status) {
        return res.send({
            success: 'False',
            message: 'Missing product status'
        })
    }
    if(!price) {
        return res.send({
            success: 'False',
            message: 'Missing product price'
        })
    }
    if(!total) {
        return res.send({
            success: 'False',
            message: 'Missing total amount'
        })
    }
    if(!available) {
        return res.send({
            success: 'False',
            message: 'Missing availibility field'
        })
    }
    if(!readyToDispatch) {
        return res.send({
            success: 'False',
            message: 'Missing readyToDispatchstill'
        })
    }
    if(!dispatched) {
        return res.send({
            success: 'False',
            message: 'Missing dispatched status'
        })
    }
    if(!productName) {
        return res.send({
            success: 'False',
            message: 'Missing product name'
        })
    }
    const product = new Product;
    product.vendorEmail = vendorEmail;
    product.status = status;
    product.price = price;
    product.total = total;
    product.available = available;
    product.readyToDispatch = readyToDispatch;
    product.dispatched = dispatched
    product.productName = productName
    // console.log(product.vendorEmail, product.status, product.price, product.total, product.available, product.readyToDispatch)
    // console.log('Reached heress')
    product.save((err, product) => {
        if(err) {
            console.log(err)
            return res.send({
                success: 'False',
                message: 'Server error'
            })
        }
        console.log('New product added :)')
        return res.send({
            success: 'True',
            message: 'Product Added'
        })
    })
})

router.post('/getCurrentProducts', (req, res) => {
    const {vendorEmail} =req.body
    Product.find({
        vendorEmail: vendorEmail,
        status: 'valid',
        readyToDispatch: false,
        dispatched: false
    }, (err, products) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'server error'
            })
        }
        return res.send({
            success: 'True',
            message: products
        })
    })
})
router.post('/removeCurrentProduct', (req, res) => {
    const {id} = req.body
    console.log(req.body)
    Product.findByIdAndUpdate({_id: id}, {status: "Invalid"}, (err, docs) => {
        if(err) {
            return res.send({
                succes: 'False',
                message: 'server error'
            })
        }
        return res.send({
            success: 'True',
            message: 'Updated'
        })
    })
    
})
router.post('/getReadyProducts', (req, res) => {
    const {vendorEmail} =req.body
    Product.find({
        vendorEmail: vendorEmail,
        status: 'valid',
        readyToDispatch: true,
        dispatched: false
    }, (err, products) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'server error'
            })
        }
        return res.send({
            success: 'True',
            message: products
        })
    })
})
router.post('/dispatchProduct', (req, res) => {
    const {id} = req.body
    console.log(req.body)
    Product.findByIdAndUpdate({_id: id}, {dispatched: true}, (err, docs) => {
        if(err) {
            return res.send({
                succes: 'False',
                message: 'server error'
            })
        }
        return res.send({
            success: 'True',
            message: 'Dispatching'
        })
    })
})

router.post('/getDispatchedProducts', (req, res) => {
    const {vendorEmail} =req.body
    Product.find({
        vendorEmail: vendorEmail,
        status: 'valid',
        readyToDispatch: true,
        dispatched: true
    }, (err, products) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'server error'
            })
        }
        return res.send({
            success: 'True',
            message: products
        })
    })
})

module.exports = router;

