var PollForm = require('../models/PollForm');
var PollOption = require('../models/PollOption');
var VotingRight = require('../models/VotingRight');
var Vote = require('../models/Vote');
var User = require('../models/User');

async function createUser(email) {
    const user = await User.findOne(
        {
        where: {
            email: email
        }
    });
    if (!user)
        await User.create({
            email: email
        });
}

async function createPoll(title, description, creator) {
    return await PollForm.create({
        title: title,
        description: description,
        creator: creator.email
    });
}

async function createVotingRight(poll, member) {
    await createUser(member.email);
    return await VotingRight.create({
        pollFormId: poll.id,
        userId: member.email
    });
}

async function createPollOption(option, poll) {
    return await PollOption.create({
        description: option.title,
        pollForm: poll.id
    });
}

async function createVote(votingRight, option){
    return await Vote.create({
        votingRightId: votingRight.id,
        pollOptionId: option.id
    });
}

module.exports = {
    createUser: createUser,
    createPoll: createPoll,
    createVotingRight: createVotingRight,
    createPollOption: createPollOption,
    createVote: createVote,
};