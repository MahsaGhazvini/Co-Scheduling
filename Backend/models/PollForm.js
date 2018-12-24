const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');
const User = require('./User');

const PollForm = sequelize.define('pollForm', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

PollForm.belongsTo(User, {foreignKey: 'creator', onDelete: 'CASCADE'});

module.exports = PollForm;