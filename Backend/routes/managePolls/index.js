const Sequelize = require('sequelize');
const express = require('express');
const manageList = require('./manageList');
const managePage = require('./managePage');
const closePoll = require('./closePoll');
const router = express.Router();

router.use('/', manageList);
router.use('/:id/', function(req, res, next){
    req.pollId = req.params.id;
    return next();
});
router.use('/:id/', managePage);
router.use('/:id/:pollOptionId', function(req, res, next){
    req.pollId = req.params.id;
    req.optionId = req.params.pollOptionId;
    return next();
});
router.use('/:id/:pollOptionId', closePoll);
module.exports = router;