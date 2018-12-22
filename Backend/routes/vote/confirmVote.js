const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');
const Vote = require('../../models/Vote');

router.post('/', function(req, res, next) {
    const email = req.query.email;
    const formId = req.pollId;
    const optionId = req.optionId;
    const ourVote = req.ourVote;
    if(ourVote != 'agree' && ourVote != 'disagree')
        return res.status(400).send('bad voting');
    Vote.findOne({
        where: {pollOptionId: optionId},
        include: {
            model: VotingRight,
            where: {
                pollFormId: formId,
                userId: email
            },
        }
    }).then(out => {
        out.states= ourVote;
        out.save();
    });
    return res.status(200).send('successful');
});

module.exports = router;