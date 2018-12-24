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
        }).then(votes => {
            if(form === null || votes.length === 0)
                res.send(404);
            if(form.creator !== req.query.email)
                res.send(403);
            res.status(200).json({
                                "id": form.id,
                                "title": form.title,
                                "description": form.description,
                                "count": votes.rows.map((row, i) => {
                                    return {
                                        "states": row.states,
                                        "pollOption": {
                                            "id": row.pollOption.id,
                                            "description": row.pollOption.description,
                                        },
                                        "count": votes.count[i].count
                                    }
                                })
                            })

        });
    })
});

module.exports = router;