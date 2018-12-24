const express = require('express');
const router = express.Router();
const createPoll = require('./createPoll');
const managePolls = require('./managePolls');
const vote = require('./vote');

router.use('/createPoll', createPoll);
router.use('/managePolls', managePolls);
router.use('/vote', vote);

module.exports = router;
