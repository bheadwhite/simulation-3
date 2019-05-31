const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    register: (req, res, next) => {
        const db = req.app.get('db')
        const { username , password} = req.body
        db.helo_users.findOne({ username })
        .then(user => {
            if(user){
                throw('Sorry this username already exists. Please login.')
            } else {
                //make new user
                // encrypt password
                return bcrypt.hash(password, saltRounds)
                .then(hash => {
                    //create a new user with hashed password
                    const newUser = {
                        username: username,
                        password: hash,
                        pic: `https://robohash.org/${username}`
                    }
                    //insert into db
                    db.helo_users.insert(newUser)
                    .then(user => {
                        //delete password
                        delete user.password;
                        //assign user to session
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
        const db = req.app.get('db');
        const { username, password } = req.body
        
        db.helo_users.findOne({username})
        .then(user => {
            if(!user){
                throw('No user found with that name. Please Register')
            } else {
                //check password
                bcrypt.compare(password, user.password)
                .then(correctPassword => {
                    if(correctPassword){
                        delete password
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
        const db = req.app.get('db')
        db.getAllPosts()
        .then(resp => {
            res.send(resp)
        })
        .catch(e => console.log(e))

    },
    getPostById: (req, res, next) => {
        const db = req.app.get('db')
        db.query(
            `select u.username, u.pic, p.id, p.title, p.img, p.content from helo_users as u inner join helo_posts as p on u.id = p.user_id where p.id = ${req.params.id} `
        ).then( resp => res.status(200).send(resp))
    },
    newPost: (req, res, next) => {
        console.log('newpost')
        const db = req.app.get('db')
        db.helo_posts.save({
            title: req.body.title,
            img: req.body.img,
            content: req.body.content,
            user_id: req.session.userId,
        }).then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
    },
    auth: (req, res, next) => {
        const db = req.app.get('db')
        if(req.session && req.session.userId){
            db.helo_users.find({id: req.session.userId})
            .then(resp => res.status(200).send(resp))
            .catch(e => console.log(e))
        } else {
            res.send('no session userId')
        }

    }
}