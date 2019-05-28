require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    controller = require('./controller'),
    app = express(),
    massive = require('massive'),
    cors =require('cors'),
    cookieParser = require('cookie-parser'),
    session = require('express-session')

const port = process.env.SERVER_PORT || 3001

massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .catch(err => console.log(err))

app.use(cors(), bodyParser.json())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

//express.static will serve up the front end through the server.

app.post('/api/register', controller.addUser )
app.post('/api/login', controller.loginUser)
app.post('/api/newPost/', controller.newPost)
app.get('/api/posts/', controller.getPosts)
app.get('/api/post/:id', controller.getPostById)
app.get('/api/auth/me', controller.auth)
app.get('/api/logout/me', (req, res, next) => req.session.destroy())

app.listen(port, ()=> {console.log(`server is running on ${port}`)})