require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation , loginValidation } = require('../validation')
const { valid } = require('@hapi/joi')
const verify = require('./verifytoken')
const { request } = require('express')
const transportIt = require('../nodmailer')





router.get('/get-users',verify, async (req,res)=>{
    try{
        const userData =  await User.find()
        res.json({userData})
    }catch(error){
        res.status(500)
    }
})

router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({username : req.body.username})
    if (!user) return res.status(400).send("Email not found")
    
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send("Password not found")
    
});
    

    
    


router.post('/reg_user', async (req, res)=>{
    const {error} = registerValidation(req.body)
    
    if (error) return res.status(400).send(error.details[0].message)
    


    const username = req.body.username
    const users = await User.find()
    let state = 0

    
    for(var ind in users){
        if(username === users[ind].username){
            res.status(414).json({message: 'this username already exists'})
            state = 1
            break
        }
    }

    
    if(state === 0){
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            mobile: req.body.mobile,
            name: req.body.name,
            email: req.body.email
    })   
        try{
            const newUser = await user.save()
            res.status(201).json({message: 'new user created', user: newUser})
            
            
            
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
    
});






module.exports = router