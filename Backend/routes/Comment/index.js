const express = require('express');
const router = express.Router();
const AddComment = require('./addComment');
const AddReply = require('./addReply');
const GetComments = require('./getComments');
const GetReplies = require('./getReplies');

router.use('/addComment', AddComment);
router.use('/addReply', AddReply);
router.use('/getComments', GetComments);
router.use('/getReplies', GetReplies);
module.exports = router;