const express = require('express');
const router = express.Router();
const AddComment = require('./addComment');
const AddReply = require('./addReply');

router.use('/', AddComment);
router.use('/reply', AddReply);
module.exports = router;