const express = require('express'),
    bodyParser = require('body-parser'),
    controller = require('./controller'),
    app = express(),
    massive = require('massive'),
    cors =require('cors'),
    cookieParser = require('cookie-parser'),
    session = require('express-session')
require('dotenv').config()

app.use(cors(), cookieParser(), bodyParser.json(), session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { secure: true }
}))

massive(process.env.CONNECTION_STRING).then(db =>{
    app.set('db', db)
    console.log('db is connected')
})
//express.static will serve up the front end through the server.

app.post('/api/register', controller.addUser )
app.post('/api/login', controller.loginUser)
app.post('/api/newPost/', controller.newPost)
app.get('/api/posts/', controller.getPosts)
app.get('/api/post/:id', controller.getPostById)
app.get('/api/auth/me', controller.auth)
app.get('/api/logout/me', (req, res, next) => req.session.destroy())

const port = 3001
app.listen(port, ()=> {console.log(`server is running on ${port}`)})