const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create model associations
// associate post with user via user_id
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});
// associate user with post via user_id
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
// associate user with comment via user_id
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
// associate post with comment via post_id
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
// associate comment with user via user_id
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});
// associate post with comment via post_id
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

module.exports = { User, Post, Comment };