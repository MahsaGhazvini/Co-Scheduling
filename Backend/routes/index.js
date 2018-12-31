const express = require('express');
const router = express.Router();
const createPoll = require('./createPoll');
const managePolls = require('./managePolls');
const vote = require('./vote');
const Comment = require('./Comment');
const EditPoll = require('./EditPoll');

router.use('/createPoll', createPoll);
router.use('/managePolls', managePolls);
router.use('/vote', vote);
router.use('/comment', Comment);
router.use('/editPoll',EditPoll);

module.exports = router;
