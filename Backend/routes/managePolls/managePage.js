const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');
const Vote = require('../../models/Vote');

router.get('/', function(req, res, next) {
    PollForm.findById(req.pollId).then(form => {
        Vote.findAndCountAll({
            include:{
                model: PollOption,
                where: {
                    pollFormId: req.pollId
                }
            },
            group: ['vote.pollOptionId','vote.states']
        }).then(async votes => {
            if(form === null || votes.length === 0)
                res.send(404);
            if(form.creator !== req.query.email)
                res.send(403);
            let dic = {};
            await votes.rows.forEach((row,i) => {
                if(dic[row.pollOption.id] === undefined)
                    dic[row.pollOption.id] = {
                        "description": row.pollOption.description,
                        "isFinalized": row.pollOption.isFinalized,
                        "votes": {
                            "notVoted": 0,
                            "agree": 0,
                            "disagree": 0
                        }
                    };
                dic[row.pollOption.id]["votes"][row.states] = votes.count[i].count;
            });
            res.status(200).json({
                "id": form.id,
                "title": form.title,
                "description": form.description,
                "active": form.active,
                "options": dic
            });
        });
    })
});

module.exports = router;