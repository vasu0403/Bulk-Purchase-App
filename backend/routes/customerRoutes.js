const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = require('../models/product')
const SoldItem = require('../models/soldItem')
const Review = require('../models/review')
const Vendor = require('../models/vendor')


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
            let allItems = []
            let completed = 0
            if(products.length == 0) {
                return res.send({
                    success: "True",
                    message: []
                })
            }
            for(var i = 0; i < products.length; i++) {
                let curProduct = products[i]
                let vendorEmail = curProduct.vendorEmail
                Vendor.find({
                    email: vendorEmail
                }, (err, vendor) => {
                    if(err) {
                        return res.send({
                            success: 'False',
                            message: []
                        })
                    }
                    let temp = {}
                    temp._id = curProduct._id
                    temp.productName = curProduct.productName
                    temp.vendorEmail = curProduct.vendorEmail
                    temp.status = curProduct.status
                    temp.price = curProduct.price
                    temp.total = curProduct.total
                    temp.available = curProduct.available
                    temp.readyToDispatch = curProduct.readyToDispatch
                    temp.dispatched = curProduct.dispatched
                    temp.vendorRating = vendor[0].rating
                    allItems.push(temp)
                    completed++
                    if(completed == products.length) {
                        return res.send({
                            success: 'True',
                            message: allItems
                        })
                    }

                })
            }
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
            if(products.length == 0) {
                return res.send({
                    success: "True",
                    message: []
                })
            }
            let allItems = []
            let completed = 0
            for(var i = 0; i < products.length; i++) {
                let curProduct = products[i]
                let vendorEmail = curProduct.vendorEmail
                Vendor.find({
                    email: vendorEmail
                }, (err, vendor) => {
                    if(err) {
                        return res.send({
                            success: 'False',
                            message: []
                        })
                    }
                    let temp = {}
                    temp._id = curProduct._id
                    temp.productName = curProduct.productName
                    temp.vendorEmail = curProduct.vendorEmail
                    temp.status = curProduct.status
                    temp.price = curProduct.price
                    temp.total = curProduct.total
                    temp.available = curProduct.available
                    temp.readyToDispatch = curProduct.readyToDispatch
                    temp.dispatched = curProduct.dispatched
                    temp.vendorRating = vendor[0].rating
                    allItems.push(temp)
                    completed++
                    if(completed == products.length) {
                        return res.send({
                            success: 'True',
                            message: allItems
                        })
                    }

                })
            }
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
        soldItem.reviewed = false
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
                temp['soldItemId'] = curItem._id
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

router.post('/productsForReview', (req, res) => {
    const {customerEmail} = req.body
    SoldItem.find({
        customerEmail: customerEmail,
        reviewed: false
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
                _id: curItem.productId,
                dispatched: true
            }, (err, product) => {
                if(err) {
                    return res.send({
                        success: 'False',
                        message: []
                    })
                }
                if(product.length != 0) {
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
                    temp['itemNo'] = completed
                    temp['soldItemId'] = curItem._id
                    console.log(temp)
                    allItems.push(temp)  
                }
                
                completed++
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

router.post('/postReview', (req, res) => {
    const {productName, productId, vendorEmail, customerEmail, review, rating, soldItemId} = req.body
    const new_review = new Review
    new_review.productName = productName
    new_review.productId = productId
    new_review.vendorEmail = vendorEmail
    new_review.customerEmail = customerEmail
    new_review.review = review
    new_review.rating = rating
    new_review.save((err, new_review) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'Server error'
            })
        }
        SoldItem.findOneAndUpdate({_id: soldItemId}, {reviewed: true}, (err, docs) => {
            if(err) {
                return res.send({
                    success: 'False',
                    message: 'Server errod'
                })
            }
            return res.send({
                success: 'True',
                message: 'Review Added successfully'
            })
        });
    })
});
router.post('/changeOrder', (req, res) => {
    const {productId, soldItemId, required, previousAmount, customerEmail} = req.body
    Product.find({
        _id: productId
    }, (err, products) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'server error'
            });
        }
        available = products[0].available
        available = available + previousAmount
        if(required > available) {
            return res.send({
                success: 'False',
                message: 'This much quantity is not available'
            })
        }
        available = available - required
        if(available == 0) {
            Product.findByIdAndUpdate({_id: productId}, {readyToDispatch: true, available: available}, (err, docs) => {
                if(err) {
                    return res.send({
                        success: 'False',
                        message: 'server error'
                    })
                }
                console.log(soldItemId, 'herer')
                SoldItem.findByIdAndUpdate({_id: soldItemId}, {amount: required}, (err, docs) => {
                    if(err) {
                        return res.send({
                            success: 'False',
                            message: 'server error'
                        })
                    }
                    return res.send({
                        success: 'True',
                        message: 'Succesful'
                    })
                })
            })
        } else {
            Product.findByIdAndUpdate({_id: productId}, {available: available}, (err, docs) => {
                if(err) {
                    return res.send({
                        success: 'False',
                        message: 'server error'
                    })
                }
                console.log(soldItemId, 'hererere')
                SoldItem.findByIdAndUpdate({_id: soldItemId}, {amount: required}, (err, docs) => {
                    if(err) {
                        return res.send({
                            success: 'False',
                            message: 'server error'
                        })
                    }
                    return res.send({
                        success: 'True',
                        message: 'Succesful'
                    })
                })
            })
        }
    });
});
module.exports = router;
