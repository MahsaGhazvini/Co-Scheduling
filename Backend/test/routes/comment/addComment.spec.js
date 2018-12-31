const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('POST /comment/addComment', function () {

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
        ],
        { 'logging': false }
    );

    it('should add a comment to an option', function(done) {
        request
            .post('/comment/addComment')
            .send({
                owner:"sahar.rajabi76@gmail.com",
                content: "seems to be best for me",
                optionId: 2
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {message: "successful"})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should prevent a user that is not a member of poll to add comment', function(done) {
        request
            .post('/comment/addComment')
            .send({
                owner:"sahar.rajabi@gmail.com",
                content: "seems to be best for me",
                optionId: 2
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});