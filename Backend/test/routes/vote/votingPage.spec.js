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
            path.resolve(path.join(__dirname, '../../unit/mockedData/users.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/pollForms.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/votingRights.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/pollOptions.json')),
            path.resolve(path.join(__dirname, '../../unit/mockedData/votes.json')),
        ],
        { 'logging': false }
    );

    it('should return detail of a passed poll', function(done) {
        request
            .get('/vote/2?email=sahar.rajabi76@gmail.com')
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
                if (res.body.options.length > 0){
                    for (let i = 0; i < res.body.options.length; i++){
                        res.body.options[i].should.have.property("id");
                        res.body.options[i].should.have.property("description");
                        res.body.options[i].should.have.property("ourChoice");
                        res.body.options[i].should.have.property("isFinalized");
                    }
                }
                done();
            });
    });

    it('should rise error when you are not a member', function(done) {
        request
            .get('/vote/2?email=sahar.rajabi@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(403)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});