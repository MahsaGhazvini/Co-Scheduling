const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const CommentOption = require('./CommentOption');
const User = require('./User');

const ReplyComment = sequelize.define('replyComment', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: Sequelize.STRING
});

ReplyComment.belongsTo(User, {foreignKey: 'owner', onDelete: 'CASCADE'});
ReplyComment.belongsTo(CommentOption, {foreignKey: 'commentId', onDelete: 'CASCADE'});
ReplyComment.belongsTo(ReplyComment, {foreignKey: 'replyTo'});

module.exports = ReplyComment;