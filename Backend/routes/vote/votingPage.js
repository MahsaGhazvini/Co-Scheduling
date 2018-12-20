const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');

router.get('/', function(req, res, next) {
    PollForm.findOne({
        where: { id: req.pollId }
    }).then(form => {
        if(form === null)
            res.send(404);
        else {
            PollOption.findAll({
                where: { pollFormId: req.pollId }
            }).then(options => {
                res.status(200).json({
                    "id": form.id,
                    "title": form.title,
                    "description": form.description,
                    "options": options.map(option => {
                        return {
                            "id": option.id,
                            "description": option.description
                        };
                    })
                })
            })
        }
    })
});

module.exports = router;