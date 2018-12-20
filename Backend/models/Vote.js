const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const PollOption = require('./PollOption');
const VotingRight = require('./VotingRight');

const Vote = sequelize.define('vote', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    selected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Vote.belongsTo(VotingRight, {foreignKey: 'votingRightId', onDelete: 'CASCADE'});
Vote.belongsTo(PollOption, {foreignKey: 'pollOptionId', onDelete: 'CASCADE'});

module.exports = Vote;