const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const VotingRight = require('../../models/VotingRight');
const PollOption = require('../../models/PollOption');
const router = express.Router();

router.post('/', async function addComment(req, res){
    let owner = req.body.owner;
    let content = req.body.content;
    let optionId = req.body.optionId;

    const pollFormId = await DBUtils.getPollFormIdByOption(optionId);
    const member = await VotingRight.findOne({
        where: {
            userId: owner,
            pollFormId: pollFormId
        }
    });

    if(member) {
        await DBUtils.createCommentOption(owner, optionId, content);
        return res.status(200).json({'message': 'successful'});
    }
    return res.status(400).json({'message': 'failed'});
});

module.exports = router;