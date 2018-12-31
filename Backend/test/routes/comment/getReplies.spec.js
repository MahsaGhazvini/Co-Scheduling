const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const should = require('should')

describe('GET /comment/getReplies', function () {

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

    it('should return list of replies on something', function(done) {
        request
            .get('/comment/getReplies?email=sahar.rajabi76@gmail.com&commentId=1&replyTo=null')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                if (res.body.length > 0){
                    res.body[0].should.have.property("id");
                    res.body[0].should.have.property("content");
                    res.body[0].should.have.property("owner");
                    res.body[0].should.have.property("replyTo");
                }
                done();
            });
    });


    it('should prevent someone from getting the replies when is not a member of that poll', function(done) {
        request
            .get('/comment/getReplies?email=sahar.rajabi@gmail.com&commentId=2&replyTo=null')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, {'message': 'failed'})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });});