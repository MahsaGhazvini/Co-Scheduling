const Sequelize = require('sequelize');
const express = require('express');
const manageList = require('./manageList');
const router = express.Router();

router.use('/', manageList);

module.exports = router;