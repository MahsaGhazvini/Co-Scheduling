const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const should = require('should')

describe('GET /managePolls/:id', function () {

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

    var isValidres = function(res) {
        res.body.should.have.property("id", "title", "description", "options");
    };

    it('should return list of active or closed polls', function(done) {
        request
            .get('/managePolls/2?email=saharsamr@gmail.com&active=0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.have.property("id");
                res.body.should.have.property("description");
                res.body.should.have.property("title");
                res.body.should.have.property("options");
                res.body.should.have.property("active");
                done();
        });
    });
});