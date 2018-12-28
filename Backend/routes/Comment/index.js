const express = require('express');
const router = express.Router();
const AddComment = require('./addComment');

router.use('/', AddComment);

module.exports = router;