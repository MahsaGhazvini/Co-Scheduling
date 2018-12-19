var Sequelize = require('sequelize');

const path = require('path');
const dbPath = path.resolve(__dirname, './../data/co_scheduling.db');

var sequelize = new Sequelize('database', null, null, {
    dialect: 'mssql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: dbPath
});

module.exports = sequelize;