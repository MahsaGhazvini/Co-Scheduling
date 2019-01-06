const request = require('supertest')(require('./../../../app'));

const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;


describe('POST /editPoll', function () {
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

    it('should successfully edit a poll', function(done) {
        const data = {
            editorMail: "sahar.rajabi76@gmail.com",
            deletedOptions: [
                'first option'
            ],
            addedOptions: [
                'third option',
                'forth option'
            ],
            title: 'first poll edited',
            description: 'for testING',
            formId: 2,
            openPoll: true
        };
        request
            .post('/editPoll')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should prevent all from editing a poll, except the owner', function(done) {
        const data = {
            editorMail: "sahar.rajabi@gmail.com",
            deletedOptions: [
                'first option'
            ],
            addedOptions: [
                'third option',
                'forth option'
            ],
            title: 'first poll edited',
            description: 'for testING',
            formId: 2,
            openPoll: true
        };
        request
            .post('/editPoll')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});