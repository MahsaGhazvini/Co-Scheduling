const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const PollForm = require('./PollForm');
const User = require('./User');

const VotingRight = sequelize.define('votingRight', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

VotingRight.belongsTo(PollForm, {foreignKey: 'pollFormId', onDelete: 'CASCADE'});
VotingRight.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = VotingRight;