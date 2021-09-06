const express = require('express')
const mongoose = require('mongoose')




const Product = mongoose.Schema({
    prod_name:{
        type : String,
        required : true
    },
    
   
    prod_desc:{
        type : String,
        required :true
    },
    prod_price:{
        type : Number,
        required : true
    },
    prod_icon:{
        data:Buffer,
        required:true,
        contentType:String
    }
    

    
})


module.exports = mongoose.model('product', Product);