const express = require('express');
const router = express.Router();
const Comments = require('../../models/CommentOption');
const VotingRight = require('../../models/VotingRight');
const DBUtils = require('../../utils/DBUtils');

router.get('/', async function(req, res, next) {
    const email = req.query.email;
    const optionId = req.query.optionId;

    const pollFormId = await DBUtils.getPollFormIdByOption(optionId);
    const permissions = await VotingRight.findOne({
        where:{
            userId: email,
            pollFormId: pollFormId
        }
    });
    if(permissions){
        let comments = await Comments.findAll({
            where: {optionId: optionId}
        });
        comments = await comments.map(comment => {
            return {
                "id": comment.get("id"),
                "owner": comment.get("owner"),
                "content": comment.get("content")
            }
        });
        res.status(200).json(comments);
    }
    res.status(400).json({'message': 'failed'});
});

module.exports = router;
