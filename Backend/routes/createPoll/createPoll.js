const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const router = express.Router();

router.post('/', async function createPoll(req, res){
    const creator = req.body.creator;
    const title = req.body.title;
    const description = req.body.description;
    const pollMembers = req.body.members;
    const options = req.body.options;

    await DBUtils.createUser(creator.email);
    const poll = await DBUtils.createPoll(title, description, creator);

    const voteRights_promise = Promise.all(pollMembers.map(
        async member =>
            await DBUtils.createVotingRight(poll, member)
    ));

    const options_promise = Promise.all(options.map(
        async option =>
            await DBUtils.createPollOption(option, poll)
    ));

    voteRights_promise.then(voteRights_arr=>{
        options_promise.then(options_arr=>{
            voteRights_arr.forEach(async (voteRight) => {
                options_arr.forEach(async (option) => {
                    await DBUtils.createVote(voteRight, option);
                });
            });
        })
    });

    res.status(200).send('successful');
});

module.exports = router;