const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('POST /comment/addReply', function () {

    const Database = require('../../../utils/DBConnection');

    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox && sandbox.restore();
    });

    sequelizeMockingMocha(
        Database,
        [
            path.resolve(path.join(__dirname, '../../unit/mockedData/users.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/pollForms.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/votingRights.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/pollOptions.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/votes.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/comments.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/replies.json')),
        ],
        { 'logging': false }
    );

    it('should add a reply to an existing comment', function(done) {
        request
            .post('/comment/addReply')
            .send({
                owner:"sahar.rajabi76@gmail.com",
                content: "me too",
                commentId: 1,
                replyTo: null
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {message: "successful"})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should prevent a user that is not a member of poll to add replies', function(done) {
        request
            .post('/comment/addComment')
            .send({
                owner:"sahar.rajabi@gmail.com",
                content: "not me!",
                commentId: 1,
                replyTo: null
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});