const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const should = require('should')

describe('GET /comment/getComments', function () {

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

    it('should return list of comments on an option id', function(done) {
        request
            .get('/comment/getComments?email=sahar.rajabi76@gmail.com&optionId=2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                if (res.body.length > 0){
                    res.body[0].should.have.property("id");
                    res.body[0].should.have.property("content");
                    res.body[0].should.have.property("owner");
                }
                done();
            });
    });


    it('should prevent someone from getting the comments when is not a member of that poll', function(done) {
        request
            .get('/comment/getComments?email=sahar.rajabi@gmail.com&optionId=2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, {'message': 'failed'})
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });});