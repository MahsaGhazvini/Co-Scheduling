const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const VotingRight = require('../../models/VotingRight');
const PollForm = require('../../models/PollForm');

router.get('/', function(req, res, next) {
    VotingRight.findAll({
        where:{
            userId: req.query.email
        },
        include:{
            model: PollForm,
            required: false,
        }
    }).then(function (result) {
        res.status(200).json(result.map(r=>{
            return {
                "id": r.pollForm.dataValues.id,
                "title": r.pollForm.dataValues.title,
                "des": r.pollForm.dataValues.description
            };
        }));
    });
});

module.exports = router;
