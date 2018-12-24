const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const PollForm = require('./PollForm');

const PollOption = sequelize.define('pollOption', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: Sequelize.STRING,
    isFinalized: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

PollOption.belongsTo(PollForm, {foreignKey: 'pollFormId', onDelete: 'CASCADE'});

module.exports = PollOption;