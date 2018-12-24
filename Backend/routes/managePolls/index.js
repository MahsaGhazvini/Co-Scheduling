const Sequelize = require('sequelize');
const express = require('express');
const manageList = require('./manageList');
const managePage = require('./managePage');

const router = express.Router();

router.use('/', manageList);
router.use('/:id/', function(req, res, next){
    req.pollId = req.params.id;
    return next();
});
router.use('/:id/', managePage);

module.exports = router;