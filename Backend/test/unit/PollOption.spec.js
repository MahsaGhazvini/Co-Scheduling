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

    // Load fake data for the pollOptions
    sequelizeMockingMocha(
        Database,
        [
            path.resolve(path.join(__dirname, './mockedData/pollForms.json')),
            path.resolve(path.join(__dirname, './mockedData/pollOptions.json')),
        ],
        { 'logging': false }
    );

    it('the service shall exist', function () {
        expect(DBUtil).to.exist;
    });

    describe('create poll option ', function () {
        it('exist', function () {
            expect(DBUtil.createPollOption).to.exist;
        });

        it('shall returns all poll options', async function () {
            const pollOptions = await DBUtil.getAllPollOptions();
            expect(pollOptions).to.be.a('array');
            const preLen = pollOptions.length;

            await DBUtil.createPollOption({title: "first option"}, {id: 1});
            const newPollOptions = await DBUtil.getAllPollOptions();
            const newLen = newPollOptions.length;
            expect(newLen).to.be.equal(preLen+1);
        });
    });
});