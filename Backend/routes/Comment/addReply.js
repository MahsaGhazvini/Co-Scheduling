const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const VotingRight = require('../../models/VotingRight');
const router = express.Router();

router.post('/', async function addComment(req, res){
    let owner = req.body.owner;
    let content = req.body.content;
    let commentId = req.body.commentId;
    let replyTo = req.body.replyTo;

    const pollFormId = await DBUtils.getPollFormIdByComment(commentId);
    const member = await VotingRight.findOne({
        where: {
            userId: owner,
            pollFormId: pollFormId
        }
    });

    if(member){
        await DBUtils.createReplyComment(owner, commentId, replyTo, content);
        return res.status(200).json({'message':'successful'});
    }
    return res.status(400).json({'message': 'failed'});
});

module.exports = router;