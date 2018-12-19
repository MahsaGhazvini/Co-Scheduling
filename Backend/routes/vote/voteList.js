const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');

router.get('/', function(req, res, next) {
    let resJson = {
        data: []
    };
    VotingRight.findAll({
        where:{
            id: req.query.email
        }
    }).then(votingRights=>{
        votingRights.forEach(votingRight => {
            let pollFormId = votingRight.pollFromId;
            PollForm.findAll({
                where:{
                    id: pollFormId
                }
            }).then(pollForm => {
                resJson.data.push({
                    id: pollFormId,
                    title: pollForm.title,
                    description: pollForm.description
                });
            })
        });
        res.status(200).json(resJson);
    });
    console.log(resJson);
    console.log(req.query.email);
    return res;
});

module.exports = router;
