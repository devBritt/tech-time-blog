const { Post, Comment, User } = require('../models');
const router = require('express').Router();

// view dashboard
router.get('/', async (req, res) => {
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

        res.render('dashboard', {
            posts,
            username: req.session.username,
            loggedIn: req.session.loggedIn
        });
    }
});

// view new/edit post page


module.exports = router;