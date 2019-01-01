const request = require('supertest')(require('./../../../app'));

const expect = require('chai').expect;
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;


describe('POST /editPoll', function () {
    const Database = require('../../../utils/DBConnection');
    const DBUtil = require('../../../utils/DBUtils');

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

    it('should successfully edit a poll', function(done) {
        const data = {
            email: "sahar.rajabi76@gmail.com",
            deletedOptions: [
                'first option'
            ],
            addedOptions: [
                'third option',
                'forth option'
            ],
            title: 'first poll'
        };
        request
            .post('/editPoll')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

        const deletedOptions = DBUtil.selectListOfOptions(data.deletedOptions, data.title);
        expect(deletedOptions.length).to.be.equal(0);

        const addedOptions = DBUtil.selectListOfOptions(data.addedOptions, data.title);
        expect(addedOptions.length).to.be.equal(data.addedOptions.length);
    });

    it('should prevent all from editing a poll, except the owner', function(done) {
        const data = {
            email: "sahar.rajabi@gmail.com",
            deletedOptions: [
                'first option'
            ],
            addedOptions: [
                'third option',
                'forth option'
            ],
            title: 'first poll'
        };
        request
            .post('/editPoll')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});