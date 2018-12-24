const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

const PollForm = require('../../models/PollForm');
const PollOption = require('../../models/PollOption');

router.post('/', function(req, res, next) {
    const email = req.query.email;
    const formId = req.pollId;
    const optionId = req.optionId;

    PollForm.findById(formId).then(form => {
        if(form.creator !== email)
            return res.send(403);
        else if(form.active === false)
            return res.status(400).send('Poll form ended before!');
        else{
            form.active= false;
            form.save();
            return res.status(200).send('Successful');
        }
    }).catch(error => {return res.status(400).send('Poll form not exist')})
});

module.exports = router;