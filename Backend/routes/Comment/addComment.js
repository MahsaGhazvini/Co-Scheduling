const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const router = express.Router();

router.post('/', async function addComment(req, res){
    let owner = req.body.owner;
    let content = req.body.content;
    let optionId = req.body.optionId;

    await DBUtils.createCommentOption(owner, optionId, content);

    return res.status(200).json({'message':'successful'});
});

module.exports = router;