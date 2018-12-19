const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const PollFrom = require('./PollForm');

const PollOption = sequelize.define('pollOption', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: Sequelize.STRING,
});

PollOption.belongsTo(PollFrom, {foreignKey: 'pollFrom', onDelete: 'CASCADE'});

module.exports = PollOption;