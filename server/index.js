const express = require("express"),
	bodyParser = require("body-parser"),
	controller = require("./controller"),
	app = express(),
	massive = require("massive"),
	cors = require("cors"),
	cookieParser = require("cookie-parser"),
	session = require("express-session"),
	path = require("path")
require("dotenv").config()

const port = process.env.SERVER_PORT || 3001

massive(process.env.CONNECTION_STRING)
	.then(db => app.set("db", db))
	.catch(err => console.log(err))

app.use(
	cors(),
	bodyParser.json(),
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 60000
		}
	})
)

//express.static will serve up the front end through the server
app.use(express.static(path.join(__dirname, 'build')))

app.post("/api/register", controller.register)
app.post("/api/login", controller.login)

app.use((req, res, next) => {
	if (!req.session.user) {
		res.send(false)
	} else {
		next()
	}
})

app.post("/api/newPost/:id", controller.newPost)
app.delete('/api/post/:id', controller.deletePost)
app.get("/api/posts", controller.getPosts)
app.get("/api/post/:id", controller.getPostById)
app.get("/api/auth/me", controller.auth)
app.get("/api/logout", controller.logout)

app.use('*', (req, res) => {
	res.sendFile('index.html', {
		root: path.join(__dirname, 'build')
	})
})

app.listen(port, () => {
	console.log(`server is running on ${port}`)
})
