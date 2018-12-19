const express = require('express');
const router = express.Router();
const createPoll = require('./createPoll');

router.use('/', createPoll);

module.exports = router;