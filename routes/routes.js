require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { registerValidation , loginValidation } = require('../validation/validation')





router.get('/get-users', async (req,res)=>{
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
    if (!user) return res.status(400).send("Username not found")
    
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send("Password not found")
    res.json(
        { 
           message: 'signup success',
            username : req.body.username,
             password : user.password,
        }
    )
    console.log(req.body.username,req.body.password)




    
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
            name: req.body.name,
            
    })   
        try{
            const newUser = await user.save()
            console.log(newUser)
            res.status(201).json({message: 'new user created', user: newUser})
            
            
            
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
    
});







module.exports = router