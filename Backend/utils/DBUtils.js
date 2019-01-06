var PollForm = require('../models/PollForm');
var PollOption = require('../models/PollOption');
var VotingRight = require('../models/VotingRight');
var Vote = require('../models/Vote');
var User = require('../models/User');
var CommentOption = require('../models/CommentOption');
var ReplyComment = require('../models/ReplyComment');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

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

async function getAllUsers() {
    const users = await User.findAll();
    return users.map(user => user.dataValues);
}

async function createPoll(title, description, creator) {
    return await PollForm.create({
        title: title,
        description: description,
        creator: creator.email
    });
}

async function getAllPolls() {
    const polls = await PollForm.findAll();
    return polls.map(polls => polls.dataValues);
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
        pollFormId: poll.id
    });
}

async function selectListOfOptions(list, pollName){
    return await PollOption.findAll({
        where: {
            description: {
                [Op.or]: list,
            }
        },
        include: {
            model: PollForm,
            where: {
                title: pollName
            }
        }
    });
}

async function createCommentOption(owner, optionId, content) {
    return await CommentOption.create({
        content: content,
        owner: owner,
        optionId: optionId
    });
}

async function createReplyComment(owner, commentId, replyTo, content) {
    return await ReplyComment.create({
        content: content,
        owner: owner,
        commentId: commentId,
        replyTo: replyTo
    });
}

async function getAllVotingRights() {
    const votingRights = await VotingRight.findAll();
    return votingRights.map(votingRights => votingRights.dataValues);
}

async function getAllPollOptions() {
    const pollOptions = await PollOption.findAll();
    return pollOptions.map(pollOptions => pollOptions.dataValues);
}

async function createVote(votingRight, option){
    return await Vote.create({
        votingRightId: votingRight.id,
        pollOptionId: option.id
    });
}

async function getAllVotes() {
    const votes = await Vote.findAll();
    return votes.map(votes => votes.dataValues);
}

async function getPollFormIdByOption(pollOptionId){
    let pollOption = await PollOption.findByPrimary(pollOptionId);
    if(pollOption){
        return pollOption.get("pollFormId");
    }
    return null;
}

async function getPollFormIdByComment(commentId){
    let comment = await CommentOption.findByPrimary(commentId);
    if(comment) {
        let pollOptionId = await comment.get("optionId");
        return getPollFormIdByOption(pollOptionId);
    }
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    createPoll: createPoll,
    getAllPolls: getAllPolls,
    createVotingRight: createVotingRight,
    getAllVotingRights: getAllVotingRights,
    createPollOption: createPollOption,
    getAllPollOptions: getAllPollOptions,
    createVote: createVote,
    getAllVotes: getAllVotes,
    createCommentOption: createCommentOption,
    createReplyComment: createReplyComment,
    selectListOfOptions: selectListOfOptions,
    getPollFormIdByOption: getPollFormIdByOption,
    getPollFormIdByComment: getPollFormIdByComment,
};