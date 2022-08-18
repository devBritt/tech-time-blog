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
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
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

// update a comment by id
router.put('/:id', (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with that id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// delete a comment by id
router.delete('/:id', (req, res) => {
    Comment.destroy({ where: { id: req.params.id } })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with that id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;