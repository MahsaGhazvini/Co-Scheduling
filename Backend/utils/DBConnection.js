var Sequelize = require('sequelize');

const path = require('path');
const dbPath = path.resolve(__dirname, './../data/co_scheduling.db');

var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mssql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    storage: dbPath
});

module.exports = sequelize;