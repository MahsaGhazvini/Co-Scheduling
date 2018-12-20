const express = require('express');
const router = express.Router();
const voteList = require('./voteList');
const votingPage = require('./votingPage');
const confirmVote = require('./confirmVote');

router.use('/', voteList);
router.use('/:id/', function(req, res, next){
    req.pollId = req.params.id;
    return next();
});
router.use('/:id/', votingPage);
// router.use('/:id/pollOptionId', function(req, res, next){
//     req.pollId = req.params.id;
//     req.optionId = req.params.pollOptionId;
//     return next();
// });
router.use('/:id/:pollOptionId', confirmVote);

module.exports = router;
