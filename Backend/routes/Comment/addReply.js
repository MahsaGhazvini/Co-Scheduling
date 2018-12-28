const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const router = express.Router();

router.post('/', async function addComment(req, res){
    let owner = req.body.owner;
    let content = req.body.content;
    let commentId = req.body.optionId;
    let replyTo = req.body.replyTo;

    await DBUtils.createReplyComment(owner, commentId, replyTo, content);

    return res.status(200).json({'message':'successful'});
});

module.exports = router;