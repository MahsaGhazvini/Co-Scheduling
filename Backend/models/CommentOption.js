const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const PollOption = require('./PollOption');
const User = require('./User');

const CommentOption = sequelize.define('commentOption', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: Sequelize.STRING
});

CommentOption.belongsTo(User, {foreignKey: 'owner', onDelete: 'CASCADE'});
CommentOption.belongsTo(PollOption, {foreignKey: 'optionId', onDelete: 'CASCADE'});

module.exports = CommentOption;