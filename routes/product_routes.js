const express = require('express')
const router = express.Router()
const Prod = require('../models/product')
var fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null,'./uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
});
const upload = multer({ storage: storage });
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

router.patch('/updateImage/:id',upload.single('img'),async (req,res)=>{
    const id = req.params.id
    const img = req.file.path
    
    const update_doc = {
        $set:{
            img
        }
    }
    try{
        const result = await Prod.findOneAndUpdate(id,update_doc,{useFindAndModify : false , new:true})
        res.status(221).json({message:"Updated Succesfully",doc:result})
    }
    catch(e){
        res.status(421).json({message : error.message})
    }
})
router.patch('/updateName/:id',upload.single('img'),async (req,res)=>{
    const id = req.params.id
    const prod_name = req.body.prod_name
    
    const update_doc = {
        $set:{
            prod_name
        }
    }
    try{
        const result = await Prod.findOneAndUpdate(id,update_doc,{useFindAndModify : false , new:true})
        res.status(221).json({message:"Updated Succesfully",doc:result})
    }
    catch(e){
        res.status(421).json({message : error.message})
    }
})
router.patch('/updatePrice/:id',upload.single('img'),async (req,res)=>{
    const id = req.params.id
    const prod_price = req.body.prod_price
    
    const update_doc = {
        $set:{
            prod_price
        }
    }
    try{
        const result = await Prod.findOneAndUpdate(id,update_doc,{useFindAndModify : false , new:true})
        res.status(221).json({message:"Updated Succesfully",doc:result})
    }
    catch(e){
        res.status(421).json({message : error.message})
    }
})
router.patch('/updateDesc/:id',upload.single('img'),async (req,res)=>{
    const id = req.params.id
    const prod_desc = req.body.prod_desc
    
    const update_doc = {
        $set:{
            prod_desc
        }
    }
    try{
        const result = await Prod.findOneAndUpdate(id,update_doc,{useFindAndModify : false , new:true})
        res.status(221).json({message:"Updated Succesfully",doc:result})
    }
    catch(e){
        res.status(421).json({message : error.message})
    }
})







module.exports = router