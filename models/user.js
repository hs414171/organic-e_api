const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const User = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
   
    
    name:{
        type : String,
        required : true
    }
    

    
})
User.pre('save',async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password,10)
        this.password = hashedPassword

    }
    catch(e){
        next(e)
    }
    
})

module.exports = mongoose.model('user', User);