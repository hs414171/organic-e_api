require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const user_routes = require('./routes/routes')
const prod_routes = require('./routes/product_routes')
const contact_routes = require('./routes/contact_routes')
const Prod = require('./models/product')


const cors = require('cors')
const port = process.env.PORT || 8000
const app = express()
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
app.use(cors(options));



mongoose.connect(
    process.env.DATABASE_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on('error', (error)=>{console.log(error)});
db.once('open', ()=>{console.log('Connected to Database')});
app.use(express.json())
app.use('/api/user',user_routes)
app.use('/api/product',prod_routes)
app.use('/api/contact',contact_routes)
app.use('/uploads',express.static('uploads'));

app.set("view engine", "ejs");



app.listen(port,()=>{
    console.log(`Server listening to port ${port}`)
})