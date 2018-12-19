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
            userId: req.query.email
        }
    }).then(votingRights=>{
        console.log(votingRights);
        votingRights.forEach(votingRight => {
            let pollFormId = votingRight.pollFormId;
            console.log(votingRight);
            PollForm.findOne({
                where:{
                    id: pollFormId
                }
            }).then(pollForm => {
                console.log(pollForm.dataValues.description);
                resJson.data.push({
                    id: pollFormId,
                    title: pollForm.dataValues.title,
                    description: pollForm.dataValues.description
                });
            })
        });
        console.log("resssssss:");
        console.log(resJson);
        res.status(200).json(resJson);
    });
});

module.exports = router;
