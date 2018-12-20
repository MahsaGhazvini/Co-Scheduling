const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');
const Vote = require('../../models/Vote');

router.get('/', function(req, res, next) {
    PollForm.findOne({
        where: { id: req.pollId }
    }).then(form => {
        Vote.findAll({
            include:[{
                model: PollOption,
                where: {pollFormId: req.pollId},
            },{
                model: VotingRight,
                where: {userId: req.query.email}
            }]
        }).then(options => {
            if(form === null || options.length === 0)
                res.send(404);
            else
                res.status(200).json({
                    "id": form.id,
                    "title": form.title,
                    "description": form.description,
                    "options": options.map(option => {
                        return {
                            "id": option.pollOption.id,
                            "description": option.pollOption.description,
                            "ourChoice": option.selected
                        };
                    })
                })
        })
    })
});

module.exports = router;