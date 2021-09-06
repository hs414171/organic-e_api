const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const Contact = mongoose.Schema({
    c_name:{
        type : String,
        required : true
    },
    c_email:{
        type : String,
        required :true
    },
    c_message:{
        type : String,
        required :false
    }

    
})


module.exports = mongoose.model('contact', Contact);