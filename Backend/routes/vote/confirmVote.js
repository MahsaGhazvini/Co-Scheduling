const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    let resJson = {
        data: []
    };
    res.status(200).json(resJson);
    return res;
});

module.exports = router;
