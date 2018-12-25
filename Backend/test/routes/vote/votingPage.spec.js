const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const should = require('should')

describe('GET /vote/:id', function () {

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

    it('should return detail of a passed poll', function(done) {
        request
            .get('/vote/2?email=saharsamr@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                console.log(res.body);
                res.body.should.have.property("id");
                res.body.should.have.property("title");
                res.body.should.have.property("description");
                res.body.should.have.property("active");
                res.body.should.have.property("options");
                done();
            });
    });
});