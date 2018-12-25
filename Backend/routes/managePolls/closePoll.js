const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');
const VotingRight = require('../../models/VotingRight');
const mail = require('../../services/sendingEmail');

router.post('/', function(req, res, next) {
    const email = req.query.email;
    const formId = req.pollId;
    const optionId = req.optionId;

    PollForm.findById(formId).then(form => {
        if(form.creator !== email)
            return res.send(403);
        else if(form.active === false)
            return res.status(400).send('Poll form ended before!');
        else{
            PollOption.findById(optionId).then(option =>{
                if(option.pollFormId != formId)
                    return res.status(400).send('Unmatched input parameter');
                else{
                    option.isFinalized = true;
                    option.save();
                    form.active= false;
                    form.save();
                    mail({user: "user", pass: "pass"},findMembers(formId), "close", );
                    return res.status(200).send('Successful');
                }
            });
        }
    }).catch(error => {return res.status(400).send('Poll form not exist')})

    const findMembers = async function (pollId) {
        let votingRights = await VotingRight.findAll({
            pollFormId: pollId
        });
       let members = votingRights.map(votingRight => votingRight.dataValues.userId).toString();
    };
});

module.exports = router;