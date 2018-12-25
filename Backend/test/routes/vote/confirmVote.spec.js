const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('POST /vote/:id/:pollOptionId/:ourVote', function () {

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
        ],
        { 'logging': false }
    );

    it('should vote to an option', function(done) {
        request
            .post('/vote/2/2/agree')
            .send({email:"saharsamr@gmail.com" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {message: "success"})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should set a option to disagree for a member', function(done) {
        request
            .post('/vote/2/2/disagree')
            .send({email:"saharsamr@gmail.com" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {message: "success"})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should de select an option again an mark as on voted', function(done) {
        request
            .post('/vote/2/2/notVoted')
            .send({email:"saharsamr@gmail.com" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {message: "success"})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should rise and error when you try to vote to a closed poll', function(done) {
        request
            .post('/vote/1/2/notVoted')
            .send({email:"saharsamr@gmail.com" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});