var express = require('express');
var router = express.Router();
var createPoll = require('./createPoll');
var managePolls = require('./managePolls');
var vote = require('./vote');

router.use('/createPoll', createPoll);
// router.use('/managePolls', managePolls);
// router.use('/vote', vote);

module.exports = router;
