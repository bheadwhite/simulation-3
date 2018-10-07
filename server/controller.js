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
    }
}