require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const router = express.Router();

const Customer = require('../models/customer');
const Vendor = require('../models/vendor')

mongoose.connect('mongodb://127.0.0.1:27017/customer', { useNewUrlParser: true });

router.post('/register/customer', (req, res) => {
    const {firstName, lastName, email, password} = req.body
    if(!email) {
        console.log('her')
        return res.send({
            success: 'False',
            message: 'Missing email'
        })
    }
    if(!password) {
        return res.send({
            success: 'False',
            message: 'Missing password !'
        })
    }
    if(!firstName) {
        return res.send({
            success: 'False',
            message: 'Missing first name !'
        })
    }
    if(!lastName) {
        return res.send({
            success: 'False',
            message: 'Missing last name !'
        })
    }
    Customer.find({
        email: email,
    }, (err, previousCustomer) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'Server error !'
            })
        }
        else if(previousCustomer.length > 0) {
            return res.send({
                success: "False",
                message: 'Account already exists !!'
            })
        }
        const customer = new Customer
        customer.firstName = firstName
        customer.lastName = lastName
        customer.email = email;
        customer.password = password;
        customer.save((err, customer) => {
            if(err) {
                return res.send({
                    success: 'False',
                    message: 'Server error'
                })
            }
            console.log('Customer signed up')
            return res.send({
                success: 'True',
                message: 'Account Created'
            })
        })
    })
});

router.post('/register/vendor', (req, res) => {
    const {firstName, lastName, email, password} = req.body
    if(!email) {
        console.log('her')
        return res.send({
            success: 'False',
            message: 'Missing email'
        })
    }
    if(!password) {
        return res.send({
            success: 'False',
            message: 'Missing password !'
        })
    }
    if(!firstName) {
        return res.send({
            success: 'False',
            message: 'Missing first name !'
        })
    }
    if(!lastName) {
        return res.send({
            success: 'False',
            message: 'Missing last name !'
        })
    }
    Vendor.find({
        email: email,
    }, (err, previousVendor) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'Server error !'
            })
        }
        else if(previousVendor.length > 0) {
            return res.send({
                success: "False",
                message: 'Account already exists !!'
            })
        }
        const vendor = new Vendor
        vendor.firstName = firstName
        vendor.lastName = lastName
        vendor.email = email;
        vendor.password = password;
        vendor.save((err, vendor) => {
            if(err) {
                return res.send({
                    success: 'False',
                    message: 'Server error'
                })
            }
            console.log('Vendor signed up')
            return res.send({
                success: 'True',
                message: 'Account Created'
            })
        })
    })
});

router.post('/signIn/vendor', (req, res) => {
    const {email, password} = req.body
    if(!email) {
        console.log('her')
        return res.send({
            success: 'False',
            message: 'Missing email'
        })
    }
    if(!password) {
        return res.send({
            success: 'False',
            message: 'Missing password !'
        })
    }
    Vendor.find({
        email: email,
    }, (err, previousVendor) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'Server error !'
            })
        }
        else if(previousVendor.length != 1) {
            return res.send({
                success: "False",
                message: 'Invalid email ID or Password!!'
            })
        }
        const vendor = previousVendor[0]
        const storedPassword = vendor.password
        if(storedPassword != password) {
            return res.send({
                success: 'False',
                message: 'Invalid email ID or Password'
            })
        }
        const serialise = {
            email: email,
            typeOfUser: 'vendor'
        }
        const accessToken = jwt.sign(serialise, process.env.ACCESS_TOKEN_SECRET)
        return res.send({
            success: 'True',
            message: 'Logged In',
            accessToken: accessToken
        })
    })
});

router.post('/signIn/customer', (req, res) => {
    const {email, password} = req.body
    if(!email) {
        console.log('her')
        return res.send({
            success: 'False',
            message: 'Missing email'
        })
    }
    if(!password) {
        return res.send({
            success: 'False',
            message: 'Missing password !'
        })
    }
    Customer.find({
        email: email,
    }, (err, previousCustomer) => {
        if(err) {
            return res.send({
                success: 'False',
                message: 'Server error !'
            })
        }
        else if(previousCustomer.length != 1) {
            return res.send({
                success: "False",
                message: 'Invalid email ID or Password !!'
            })
        }
        const customer = previousCustomer[0]
        const storedPassword = customer.password
        if(storedPassword != password) {
            return res.send({
                success: 'False',
                message: 'Invalid email ID or Password !!'
            })
        }
        const serialise = {
            email: email,
            typeOfUser: 'customer'
        }
        const accessToken = jwt.sign(serialise, process.env.ACCESS_TOKEN_SECRET)
        return res.send({
            success: 'True',
            message: 'Logged In',
            accessToken: accessToken
        })
    })
});

router.get('/authenticate', (req, res) => {
    console.log('authenticating')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.send({
        success: 'False',
        email: '',
        typeOfUser: ''
    })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.send({
                success: 'False',
                email: '',
                typeOfUser: ''
            })
        }
        return res.send({
            success: 'True',
            email: user.email,
            typeOfUser: user.typeOfUser
        })
    })
});

module.exports = router;