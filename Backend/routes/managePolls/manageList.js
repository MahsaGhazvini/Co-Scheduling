const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const PollForm = require('../../models/PollForm');

router.get('/', function(req, res, next) {
    PollForm.findAll({
        where:{
            creator: req.query.email,
            active: req.query.active
        },
    }).then(function (result) {
        res.status(200).json(result.map(r=>{
            return {
                "id": r.id,
                "title": r.title,
                "description": r.description
            };
        }));
    });
});

module.exports = router;
