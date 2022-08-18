const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Post,
                attributes: ['id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                atributes: ['username'],
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a comment by id


// create a new comment
router.post('/', (req, res) => {
    // expects {comment_text: 'comment text', post_id: 1, user_id: 1}
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a post by id


// delete a post by id


module.exports = router;