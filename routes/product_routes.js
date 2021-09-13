const express = require('express')
const router = express.Router()
const Prod = require('../models/product')
var fs = require('fs')
const multer = require('multer')
const {uploadFile,generateUrl} = require('../drive')
const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null,'./uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+'-'+file.originalname)
    }
});
const upload = multer({ storage: storage });
router.get('/get-products', async (req,res)=>{
    try{
        const prodData =  await Prod.find()
        res.json({prodData})
    }catch(error){
        res.status(221)
    }
})


router.post('/upload', upload.single('img'), (req, res, next) => {
    
    async function rand1(filepath){
    
        const result = await uploadFile(filepath)
        console.log(result)
        const url = "https://drive.google.com/uc?id="+result.toString()

        var obj = {
            prod_name: req.body.prod_name,
            prod_desc: req.body.prod_desc,
            prod_price : req.body.prod_price,
            img: url
        }
    
        Prod.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                res.status(201).json({message: 'new product created'})
            }
        });


        
    }
    const filePath = req.file.path
    rand1(filePath)
    
    
    
});
/* router.patch('/updateImage/:id', upload.single('img'), (req, res, next) => {
    const id = req.params.id
    const filePath = req.file.path
    

    
    async function rand1(img){
    
        const result = await uploadFile(filepath)
        const img = "https://drive.google.com/uc?id="+result.toString()
        
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


        

        
    }

    rand1(filePath)
    
    
    
}); */
router.patch('/updateName/:id',async (req,res)=>{
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
router.patch('/updatePrice/:id',async (req,res)=>{
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
router.patch('/updateDesc/:id',async (req,res)=>{
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