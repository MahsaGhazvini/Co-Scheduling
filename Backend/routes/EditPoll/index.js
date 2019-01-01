const express = require('express');
const router = express.Router();
const editPoll = require('./editPoll');


router.use('/', editPoll);

module.exports = router;