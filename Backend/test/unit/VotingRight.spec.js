'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('PollOption - PollOptionService (using sequelizeMockingMocha) - ', function () {
    const Database = require('../../utils/DBConnection');
    const DBUtil = require('../../utils/DBUtils');

    // Basic configuration: create a sinon sandbox for testing
    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox && sandbox.restore();
    });

    // Load fake data for the votingRights
    sequelizeMockingMocha(
        Database,
        [
            path.resolve(path.join(__dirname, './mockedData/pollForms.json')),
            path.resolve(path.join(__dirname, './mockedData/users.json')),
            path.resolve(path.join(__dirname, './mockedData/votingRights.json')),
        ],
        { 'logging': false }
    );

    it('the service shall exist', function () {
        expect(DBUtil).to.exist;
    });

    describe('create voting right ', function () {
        it('exist', function () {
            expect(DBUtil.createVotingRight).to.exist;
        });

        it('shall returns all voting rights', async function () {
            const votingRights = await DBUtil.getAllVotingRights();
            expect(votingRights).to.be.a('array');
            const preLen = votingRights.length;

            await DBUtil.createVotingRight({id: 1}, {email: "sahar.rajabi@gmail.com"});
            const newVotingRights = await DBUtil.getAllVotingRights();
            const newLen = newVotingRights.length;
            expect(newLen).to.be.equal(preLen+1);
        });
    });
});