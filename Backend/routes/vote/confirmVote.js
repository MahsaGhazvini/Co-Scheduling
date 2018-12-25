const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');
const Vote = require('../../models/Vote');

router.post('/', function(req, res, next) {
    const email = req.body.email;
    const formId = req.pollId;
    const optionId = req.optionId;
    const ourVote = req.ourVote;
    if(ourVote !== 'agree' && ourVote !== 'disagree' && ourVote !== 'notVoted')
        return res.status(400).json({'message':'Bad voting!'});
    PollForm.findById(formId).then(form => {
       if(form.active === false)
           return res.status(400).json({'message':'Poll form ended!'});
       else{
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
               return res.status(200).json({'message': 'success'});
           }).catch(error => {return res.status(400).json({'message':'Unmatched input parameter'})})
       }
    }).catch(error => {return res.status(400).json({'message':'Poll form not exist'})})
});

module.exports = router;