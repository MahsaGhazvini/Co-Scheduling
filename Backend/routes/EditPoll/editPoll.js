const DBUtils = require('../../utils/DBUtils');
const express = require('express');
const router = express.Router();
const mail = require('../../services/sendingEmail');
const pollOption = require('../../models/PollOption');
const pollForm = require('../../models/PollForm');
const vote = require('../../models/Vote');
const votingRight = require('../../models/VotingRight');

router.post('/', async function createPoll(req, res){

    const findMembers = async function (pollId) {
        let votingRights = await votingRight.findAll({
            pollFormId: pollId
        });
        return await votingRights.map(votingRight => votingRight.dataValues.userId);
    };

    let addedOptions, deletedOptions;
    try {
        addedOptions = JSON.parse(req.body.addedOptions);
        deletedOptions = JSON.parse(req.body.deletedOptions);
    }catch(e){
        addedOptions = req.body.addedOptions;
        deletedOptions = req.body.deletedOptions;
    }
    const title = req.body.title;
    const poll = await pollForm.findOne({
        where:{title: title}
        });
    const pollId = poll.get("id");

    for (let j = 0; j < deletedOptions.length; j++) {
        await vote.destroy({
            where: {},
            include: {
                model: pollOption,
                where: {
                    description: deletedOptions[j],
                    pollFormId: pollId
                }
            }
        });
        await pollOption.destroy({
            where: {
                description: deletedOptions[j],
                pollFormId: pollId
            }
        });
    }

    const pollMembers = await findMembers(pollId);
    const voteRights_promise = Promise.all(pollMembers.map(
        async member =>
            await votingRight.findAll({
                where: {
                    userId: member,
                    pollFormId: pollId
                }
            })
    ));
    const options_promise = Promise.all(addedOptions.map(
        async option =>
            await DBUtils.createPollOption({title: option}, {id: pollId})
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

    if(addedOptions.length !== 0 || deletedOptions.length !==0)
        mail(pollMembers.toString(), "edit", );

    return res.status(200).json({'message':'successful'});
});

module.exports = router;