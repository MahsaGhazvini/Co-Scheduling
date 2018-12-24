'use strict';

const expect = require('chai').expect; // TODO: activate field
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('PollForm - PollFormService (using sequelizeMockingMocha) - ', function () {
    const Database = require('./../../../utils/DBConnection');
    const DBUtil = require('../../../utils/DBUtils');

    // Basic configuration: create a sinon sandbox for testing
    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox && sandbox.restore();
    });

    // Load fake data for the polls
    sequelizeMockingMocha(
        Database,
        [
            path.resolve(path.join(__dirname, './fakeData/pollForms.json')),
            path.resolve(path.join(__dirname, './fakeData/users.json')),
        ],
        { 'logging': false }
    );

    it('the service shall exist', function () {
        expect(DBUtil).to.exist;
    });

    describe('create poll ', function () {
        it('exist', function () {
            expect(DBUtil.createPoll).to.exist;
        });

        it('shall returns all polls', async function () {
            const polls = await DBUtil.getAllPolls();
            expect(polls).to.be.a('array');
            const preLen = polls.length;

            await DBUtil.createPoll("4th poll", "to test", {email:"hayerisadegh@gmail.com"});
            const newPolls = await DBUtil.getAllPolls();
            const newLen = newPolls.length;
            expect(newLen).to.be.equal(preLen+1);
        });
    });
});