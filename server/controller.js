module.exports = {
    addUser: (req, res, next) => {
        const db = req.app.get('db');
        console.log('adduser')
        // does user exist?
        db.helo_users.find({
            username: req.body.username
        }).then(resp => {
            if(resp.length >= 1){
                res.send('exist')
            } else {
              db.add_user([req.body.username, req.body.password, `https://robohash.org/${req.body.username}`])
                .then(result => { 
                    const data = req.session
                    data.userId = result[0].id
                    res.status(201).send(result);})
                .catch( err => {
                    console.log(err);
                    res.status(500).send(err)
                })
            }
        })

    },
    loginUser: (req, res, next) => {
        const db = req.app.get('db');
        db.login_user([req.body.username, req.body.password])
        .then(user => {
            req.session.user = user
            req.session.save()
            res.send(user).status(201)
        })
        .catch( err => {
            // console.log(err);
            res.status(500).send(err), console.log(err)
        })
    },
    getPosts: (req, res, next) => {
        console.log(req.session)
    //     const db = req.app.get('db')
    //     const {userPosts, search} = req.query

    //     if (userPosts == 'true' && search !== ''){
    //         db.query(
    //             `select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u join helo_posts as p on u.id = p.user_id where LOWER(p.title) like LOWER('%${search}%')`)
    //         .then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
    //    } else if (userPosts == 'false' && search == '') {
    //     db.query(
    //         `select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u join helo_posts as p on u.id = p.user_id where u.id != '${id}'`)
    //     .then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
    //    } else if (userPosts == 'false' && search !== '') {
    //     db.query(
    //         `select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u join helo_posts as p on u.id = p.user_id where u.id != '${id}' AND LOWER(p.title) like LOWER('%${search}%')`)
    //     .then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
    //    } else {
    //        db.getPosts().then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
    //    }
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