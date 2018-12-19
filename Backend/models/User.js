const Sequelize = require('sequelize');
const sequelize = require('../utils/DBConnection');

const User = sequelize.define('user', {
    email:{
        type: Sequelize.STRING,
        primaryKey: true,
    }
});

module.exports = User;