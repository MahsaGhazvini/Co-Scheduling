const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');

router.get('/', function(req, res, next) {
    VotingRight.findAll({
        where:{ userId: req.query.email },
        include:{
            model: PollForm,
            where: {
                active: req.query.active
            }
        }
    }).then(function (result) {
        res.status(200).json(result.map(r=>{
            return {
                "id": r.pollForm.dataValues.id,
                "title": r.pollForm.dataValues.title,
                "description": r.pollForm.dataValues.description
            };
        }));
    });
});

module.exports = router;
