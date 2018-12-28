const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const Comments = require('../../models/CommentOption');
const Replies = require('../../models/ReplyComment');
const PollOption = require('../../models/PollOption');
const VotingRight = require('../../models/VotingRight');

router.get('/', function(req, res, next) {
    VotingRight.findAll({
        where:{
            userId: req.query.email
        }
    }).then(async permissions => {
        let formPermissions = await permissions.map(p => {return p.pollFormId});
        Replies.findAll({
            where:{
                commentId: req.query.commentId
            },
            include:{
                model: Comments,
                include:{
                    model: PollOption,
                }
            }
        }).then(function (result) {
            res.status(200).json(result.map(reply=>{
                if(formPermissions.indexOf(reply.commentOption.pollOption.pollFormId) < 0)
                    return null;
                else
                    return {
                        "id": reply.id,
                        "owner": reply.owner,
                        "content": reply.content,
                        "replyTo": reply.replyTo
                    };
            }).filter(x => x));
        });
    });
});

module.exports = router;
