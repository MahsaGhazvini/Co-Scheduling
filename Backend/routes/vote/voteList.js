const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');

router.get('/', function(req, res, next) {
    let itemsProcessed = 0;
    const resJson = {
        data: []
    };

    VotingRight.findAll({
        where:{
            userId: req.query.email
        }
    }).then(async function(votingRights){
        if(votingRights.length === 0)
            res.status(200).json(resJson);
        else {
            await votingRights.forEach(async votingRight => {
                let pollFormId = votingRight.pollFormId;
                await PollForm.findOne({
                    where: {
                        id: pollFormId
                    }
                }).then(pollForm => {
                    resJson.data.push({
                        id: pollFormId,
                        title: pollForm.dataValues.title,
                        description: pollForm.dataValues.description
                    });
                });
                if(++itemsProcessed === votingRights.length)
                    res.status(200).json(resJson);
            });
        };
    });
});

module.exports = router;
