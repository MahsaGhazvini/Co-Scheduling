const request = require('supertest')(require('./../../../app'));

// const expect = require('chai').expect;
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('POST /createPoll', function () {

    const Database = require('../../../utils/DBConnection');

    // Basic configuration: create a sinon sandbox for testing
    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox && sandbox.restore();
    });

    // Load fake data for the votes
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

    it('should create a new poll', function(done) {
        request
            .post('/createPoll')
            .send(
                {
                    creator: {email: "s.r@g.com"},
                    title: "test",
                    description: "testing!",
                    members: [
                        {email: "a.b@c.com"},
                        {email: "d.f@g.com"}
                    ],
                    options: [
                        {title: "one"},
                        {title: "two"}
                    ]
                }
            )
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});