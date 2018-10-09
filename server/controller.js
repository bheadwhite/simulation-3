module.exports = {
    addUser: (req, res, next) => {
        const db = req.app.get('db');

        db.add_user([req.body.username, req.body.password, `https://robohash.org/${req.body.username}`])
        .then(result => { res.status(201).send(result);})
        .catch( err => {
            console.log(err);
            res.status(500).send(err)
        })
    },
    loginUser: (req, res, next) => {
        const db = req.app.get('db');

        db.login_user([req.body.username, req.body.password])
        .then(result => { 
            if(result[0]){
                res.status(200).send(result)
            } else { res.status(404).send(result)}
        })
        .catch( err => {
            // console.log(err);
            res.status(500).send(err), console.log(err)
        })
    },
    getPosts: (req, res, next) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {userPosts, search} = req.query
        if (userPosts == 'true' && search !== ''){
            db.query(
                `select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u join helo_posts as p on u.id = p.user_id where LOWER(p.title) like LOWER('%${search}%')`)
            .then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
       } else if (userPosts == 'false' && search == '') {
        db.query(
            `select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u join helo_posts as p on u.id = p.user_id where u.id != '${id}'`)
        .then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
       } else if (userPosts == 'false' && search !== '') {
        db.query(
            `select u.id, u.username, u.pic, p.title, p.content, p.img, p.id as pid from helo_users as u join helo_posts as p on u.id = p.user_id where u.id != '${id}' AND LOWER(p.title) like LOWER('%${search}%')`)
        .then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
       } else {
           db.getPosts().then(resp => {res.status(200).send(resp)}).catch(e => console.log(e))
       }
    },
    getPostById: (req, res, next) => {
        const db = req.app.get('db')
        db.query(
            `select u.username, u.pic, p.id, p.title, p.img, p.content from helo_users as u inner join helo_posts as p on u.id = p.user_id where p.id = ${req.params.id} `
        ).then( resp => res.status(200).send(resp))
    }
}