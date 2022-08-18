const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/:id


// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'usernameString', email: 'email@string.com', password: 'passwordString'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            // give server access to user id
            req.session.user_id = dbUserData.id;
            // give server access to username
            req.session.username = dbUserData.username;
            // keep user logged in
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/login


// POST /api/logout


// PUT /api/users/:id


// DELETE /api/users/:id


module.exports = router;