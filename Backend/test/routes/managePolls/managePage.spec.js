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
            path.resolve(path.join(__dirname, '../../unit/mockedData/users.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/pollForms.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/votingRights.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/pollOptions.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/votes.json')),
        ],
        { 'logging': false }
    );

    var isValidres = function(res) {
        res.body.should.have.property("id", "title", "description", "options");
    };

    it('should return list of active or closed polls', function(done) {
        request
            .get('/managePolls/2?email=sahar.rajabi76@gmail.com')
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