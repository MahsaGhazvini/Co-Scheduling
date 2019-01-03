const express = require('express');
const router = express.Router();
const Replies = require('../../models/ReplyComment');
const VotingRight = require('../../models/VotingRight');
const DBUtils = require('../../utils/DBUtils');

router.get('/', async function(req, res, next) {
    const email = req.query.email;
    const comment = req.query.commentId;
    const reply = req.query.replyTo;

    const pollFormId = await DBUtils.getPollFormIdByComment(comment);
    const permissions = await VotingRight.findOne({
        where: {
            userId: email,
            pollFormId: pollFormId
        }
    });
    if(permissions){
        let replies = await Replies.findAll({
            where: {
                commentId: comment
            }
        });
        replies = await replies.map(reply => {
            return {
                "id": reply.get("id"),
                "owner": reply.get("owner"),
                "content": reply.get("content"),
                "replyTo": reply.get("replyTo")
            }
        });
        res.status(200).json(replies);
    }
    else{
        res.status(400).json({'message': 'failed'});
    }
});

module.exports = router;
