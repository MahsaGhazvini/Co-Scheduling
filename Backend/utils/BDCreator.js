const User = require('../models/User');
const PollForm = require('../models/PollForm');
const PollOption = require('../models/PollOption');
const VotingRight = require('../models/VotingRight');
const Vote = require('../models/Vote');
const CommentOption = require('../models/CommentOption');
const ReplyComment = require('../models/ReplyComment');

User.sync().then(function(){
    console.log('user table created')
}).error(function(error){
    console.log(err);
});

PollForm.sync().then(function(){
    console.log('pollForm table created')
}).error(function(error){
    console.log(err);
});

PollOption.sync().then(function(){
    console.log('pollOption table created')
}).error(function(error){
    console.log(err);
});

VotingRight.sync().then(function(){
    console.log('votingRight table created')
}).error(function(error){
    console.log(err);
});

Vote.sync().then(function(){
    console.log('vote table created')
}).error(function(error){
    console.log(err);
});

CommentOption.sync().then(function(){
    console.log('commentOption table created')
}).error(function(error){
    console.log(err);
});

ReplyComment.sync().then(function(){
    console.log('replyComment table created')
}).error(function(error){
    console.log(err);
});