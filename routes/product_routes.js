const express = require('express')
const router = express.Router()
const Prod = require('../models/product')
const multer = require('multer')
const upload = require('../middleware/middleware_multer')
var fs = require('fs')
router.post('/upload', upload.single('img'), (req, res, next) => {
 
    var obj = {
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price : req.body.prod_price,
        img: req.file.path
    }
    Prod.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).json({message: 'new product created'})
        }
    });
});









module.exports = router