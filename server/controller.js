const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
	register: (req, res, next) => {
		const db = req.app.get("db")
		const { username, password } = req.body
		db.helo_users
			.findOne({ username })
			.then(user => {
				if (user) {
					throw "Sorry this username already exists. Please login."
				} else {
					return bcrypt.hash(password, saltRounds).then(hash => {
						const newUser = {
							username: username,
							password: hash,
							pic: `https://robohash.org/${username}`
						}
						db.helo_users.insert(newUser).then(user => {
							delete user.password
							req.session.user = user
							res.status(201).send(user)
						})
					})
				}
			})
			.catch(err => {
				res.send(err)
			})
	},
	login: (req, res, next) => {
		const db = req.app.get("db")
		const { username, password } = req.body

		db.helo_users
			.findOne({ username })
			.then(user => {
				if (!user) {
					throw "No user found with that name. Please Register"
				} else {
					//check password
					bcrypt.compare(password, user.password).then(correctPassword => {
						if (correctPassword) {
							delete password
							delete user.password
							req.session.user = user
							res.send(user)
						}
					})
				}
			})
			.catch(err => {
				res.send(err)
			})
	},
	getPosts: (req, res, next) => {
		const db = req.app.get("db")
		db.getAllPosts()
			.then(resp => {
				res.send(resp)
			})
			.catch(e => console.log(e))
	},
	getPostById: (req, res, next) => {
		const db = req.app.get("db")
		db.query(
			`select u.username, u.pic, p.id, p.title, p.img, p.content from helo_users as u inner join helo_posts as p on u.id = p.user_id where p.id = ${
				req.params.id
			} `
		).then(resp => res.status(200).send(resp))
	},
	updatePostById: (req, res) => {
		const db = req.app.get("db")
	},
	newPost: (req, res, next) => {
		const db = req.app.get("db")
		const { id } = req.params
		const { title, img, content } = req.body
		db.helo_posts
			.save({
				title,
				img,
				content,
				user_id: Number(id)
			})
			.then(() => {
				db.getAllPosts().then(resp => {
					res.send(resp)
				})
			})
			.catch(e => console.log(e))
	},
	deletePost: (req, res) => {
		const db = req.app.get("db")
		const { id } = req.params
		db.helo_posts
			.destroy({ id: Number(id) })
			.then(() => {
				return db.getAllPosts()
			})
			.then(resp => {
				res.send(resp)
			}).catch(err => res.send(err))
	},
	auth: (req, res, next) => {
		if (req.session.user) {
			res.send(req.session.user)
		} else res.send(false)
	},
	logout: (req, res) => {
		req.session.destroy()
		res.send("ok")
	}
}
