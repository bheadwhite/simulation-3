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

const isAuthenticated = (req, res, next) => {
    if(!req.session.user){
        res.send({ unathenticated: !req.session.user })
    } else {
        next()
    }
}
//express.static will serve up the front end through the server.

app.post('/api/register', controller.register )
app.post('/api/login', controller.login)
app.post('/api/newPost', isAuthenticated, controller.newPost)
app.get('/api/posts', isAuthenticated, controller.getPosts)
app.get('/api/post/:id', controller.getPostById)
app.get('/api/auth/me', controller.auth)
app.get('/api/logout/me', (req, res, next) => req.session.destroy())

app.listen(port, ()=> { console.log(`server is running on ${port}`)})

