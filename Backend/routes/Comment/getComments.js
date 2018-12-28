const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const Comments = require('../../models/CommentOption');
const PollOption = require('../../models/PollOption');
const VotingRight = require('../../models/VotingRight');

router.get('/', function(req, res, next) {
    VotingRight.findAll({
        where:{
            userId: req.query.email
        }
    }).then(async permissions => {
        let formPermissions = await permissions.map(p => {return p.pollFormId});
        Comments.findAll({
            where:{
                optionId: req.query.optionId
            },
            include:{
                model: PollOption,
            }
        }).then(function (result) {
            res.status(200).json(result.map(comment=>{
                if(formPermissions.indexOf(comment.pollOption.pollFormId) < 0)
                    return null;
                else
                    return {
                        "id": comment.id,
                        "owner": comment.owner,
                        "content": comment.content
                    };
            }).filter(x => x));
        });
    });
});

module.exports = router;
