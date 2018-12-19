const express = require('express');
const router = express.Router();
const voteList = require('./voteList');
const votingPage = require('./votingPage');
const confirmVote = require('./confirmVote');

router.use('/', voteList);
router.use('/:id/', votingPage);
router.use('/:id/:pollOptionId', confirmVote);

module.exports = router;
