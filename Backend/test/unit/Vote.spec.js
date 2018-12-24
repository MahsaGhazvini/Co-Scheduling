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

    // Load fake data for the votes
    sequelizeMockingMocha(
        Database,
        [
            path.resolve(path.join(__dirname, './fakeData/users.json')),
            path.resolve(path.join(__dirname, './fakeData/pollForms.json')),
            path.resolve(path.join(__dirname, './fakeData/votingRights.json')),
            path.resolve(path.join(__dirname, './fakeData/pollOptions.json')),
            path.resolve(path.join(__dirname, './fakeData/votes.json')),
        ],
        { 'logging': false }
    );

    it('the service shall exist', function () {
        expect(DBUtil).to.exist;
    });

    describe('create vote ', function () {
        it('exist', function () {
            expect(DBUtil.createVote).to.exist;
        });

        it('shall returns all voting rights', async function () {
            const votes = await DBUtil.getAllVotes();
            expect(votes).to.be.a('array');
            const preLen = votes.length;

            await DBUtil.createVote({id: 2}, {id: 2});
            const newVote = await DBUtil.getAllVotes();
            const newLen = newVote.length;
            expect(newLen).to.be.equal(preLen+1);
        });
    });
});