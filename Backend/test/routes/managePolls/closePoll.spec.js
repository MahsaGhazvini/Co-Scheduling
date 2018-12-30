const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('POST /managePolls/:id/:pollOptionId', function () {

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

    it('should close a poll', function(done) {
        request
            .post('/managePolls/2/4')
            .send({email: "sahar.rajabi76@gmail.com"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should rise error when the poll is not yours', function(done) {
        request
            .post('/managePolls/6/12')
            .send({email: "sahar.rajabi76@gmail.com"})
            .set('Accept', 'application/json')
            .expect(403, done);
    });
});