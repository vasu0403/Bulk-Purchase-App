const express = require('express');
const mongoose = require('mongoose');
var async = require('async');

const router = express.Router();
const Product = require('../models/product')
const SoldItem = require('../models/soldItem')

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

router.post('/buyProduct', (req, res) => {
    const {id, required, customerEmail} = req.body
    console.log(id, required, customerEmail)
    let available
    Product.find({
        _id: id
    }, (err, products) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'Server error'
            })
        }
        available = products[0].available
        if(required > available) {
            return res.send({
                success: 'False',
                message: 'This much quantity is not availabe'
            })
        }
        available = available - required
        const soldItem = new SoldItem
        soldItem.productId = id
        soldItem.customerEmail = customerEmail
        soldItem.amount = required
        if(available === 0) {
            Product.findByIdAndUpdate({_id: id}, {readyToDispatch: true, available: available}, (err, docs) => {
                if(err) {
                    return res.send({
                        success: 'False',
                        message: 'server error'
                    })
                }
                soldItem.save()
                return res.send({
                    success: 'True',
                    message: 'Succesful'
                })
            })
        } else {
            Product.findByIdAndUpdate({_id: id}, {available: available}, (err, docs) => {
                if(err) {
                    return res.send({
                        success: 'False',
                        message: 'server error'
                    })
                }
                soldItem.save()
                return res.send({
                    success: 'True',
                    message: 'Succesful'
                })
            })
        }
    })
    
});
// let allItems = []
// function findProduct(allItems) {

// }
router.post('/previousOrders', (req, res) => {
    const {customerEmail} = req.body
    SoldItem.find({
        customerEmail: customerEmail
    }, (err, items) => {
        if(err) {
            return res.send({
                success: 'False',
                message: []
            })
        }
        if(items.length === 0) {
            return res.send({
                success: 'True',
                message: []
            })
        }
        let allItems = []
        console.log(items.length)
        let completed = 0
        for(let i = 0; i < items.length; i++) {
            let curItem = items[i]
            console.log(curItem.productId)
            Product.find({
                _id: curItem.productId
            }, (err, product) => {
                if(err) {
                    return res.send({
                        success: 'False',
                        message: []
                    })
                }
                let temp = {}
                temp['boughtAmount'] = curItem.amount
                temp['ProductName'] = product[0].productName
                temp['vendorEmail'] = product[0].vendorEmail
                temp['status'] = product[0].status
                temp['readyToDispatch'] = product[0].readyToDispatch
                temp['dispatched'] = product[0].dispatched
                temp['productId'] = product[0]._id
                temp['available'] = product[0].available
                temp['price'] = product[0].price
                console.log(temp)
                completed++
                allItems.push(temp)  
                if(completed === items.length) {
                    // console.log(allItems)
                    return res.send({
                        success: 'True',
                        message: allItems
                    })
                }
            })    
        }
        
    })
})
module.exports = router;
