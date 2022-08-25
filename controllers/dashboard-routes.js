const { Post, Comment, User } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// view dashboard
router.get('/', withAuth, async (req, res) => {
    // verify user is logged in
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    
    const dbPostData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at', 'post_id', 'user_id'],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    });

    // verify db response
    if (dbPostData) {
        let posts;
        // determine if user has created any posts
        if (dbPostData.length > 0) {
            posts = dbPostData.map(post => post.get({ plain: true }));
        } else {
            // if not, make it 0 for handlebars
            posts = 0;
        }
        const post_link = 'dashboard/edit';

        res.render('dashboard', {
            posts,
            // for dashboard greeting
            username: req.session.username,
            // to send user to edit-post page
            post_link,
            loggedIn: req.session.loggedIn
        });
    }
});

// view edit post page
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        
        // serialize the data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;