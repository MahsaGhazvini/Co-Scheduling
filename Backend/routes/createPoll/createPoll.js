const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const router = express.Router();

router.post('/', async function createPoll(req, res){
    var creator,pollMembers, options;
    try {
        creator = JSON.parse(req.body.creator);
        pollMembers = JSON.parse(req.body.members);
        options = JSON.parse(req.body.options);
    }catch(e){
        creator = req.body.creator;
        pollMembers = req.body.members;
        options = req.body.options;
    }
    let title = req.body.title;
    let description = req.body.description;

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

    return res.status(200).json({'message':'successful'});
});

module.exports = router;