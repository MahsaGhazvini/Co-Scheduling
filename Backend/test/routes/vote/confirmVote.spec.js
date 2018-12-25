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
            path.resolve(path.join(__dirname, '../../unit/fakeData/users.json')),
            path.resolve(path.join(__dirname, '../../unit/fakeData/pollForms.json')),
            path.resolve(path.join(__dirname, '../../unit/fakeData/votingRights.json')),
            path.resolve(path.join(__dirname, '../../unit/fakeData/pollOptions.json')),
            path.resolve(path.join(__dirname, '../../unit/fakeData/votes.json')),
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
});