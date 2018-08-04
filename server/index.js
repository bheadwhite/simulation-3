const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const app = express()
require('dotenv').config()
const massive = require('massive')
const cors =require('cors')
const session = require('express-session')

app.use(cors())
app.use(bodyParser.json())
massive(process.env.CONNECTION_STRING).then(db =>{
    app.set('db', db)
    console.log('db is connected')
})
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
}))
//express.static will serve up the front end through the server.

app.post('/api/register', controller.addUser )

app.post('/api/login', controller.loginUser)

app.listen(3001, ()=> {console.log('server is running')})