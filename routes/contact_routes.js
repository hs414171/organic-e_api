const express = require('express')
const router = express.Router()
const Request = require('../models/contact')
const { valid } = require('@hapi/joi')
const { contactValidation } = require('../validation/contact_val')
const nodemailer = require('nodemailer')
const transportIt = require('../nodmailer')

router.post('/getDetails', async (req, res) => {
    const { error } = contactValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const _message = req.body.message
    const _name = req.body.name
    const _email = req.body.email

    
    const request = new Request({
        message: _message,
        name: _name,
        email: _email
        
    })
    try {
        const newRequest = await request.save()
        res.status(201).json({ message: 'new request created', user: newRequest })
        const options = {
            from: process.env.EMAIL_ADDRESS,
            to: process.env.EMAIL_RECIEVE,
            subject: _subject,
            html: `
            <div>
                <h1>Contact Form Details</h1>
                <p> name = ${_name} </p>
                <p> name = ${_email} </p>
                <h1> Subject and message </h1>
                <u><b><p> Message </p></b></u>
                <p> ${_message} </p>

            </div>
            `
        }
        transportIt.sendMail(options,function(error,info){
            if (error){
                console.log(error)
            }
            else{
                console.log("Email Sent "+info.response)
            }
        })
        
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router