const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const PollFrom = require('./PollForm');
const User = require('./User');

const VotingRight = sequelize.define('votingRight', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

VotingRight.belongsTo(PollFrom, {foreignKey: 'pollFromId', onDelete: 'CASCADE'});
VotingRight.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = VotingRight;