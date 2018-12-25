'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('User - UserService (using sequelizeMockingMocha) - ', function () {
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

    // Load fake data for the users
    sequelizeMockingMocha(
        Database,
        path.resolve(path.join(__dirname, './mockedData/users.json')),
        { 'logging': false }
    );

    it('the service shall exist', function () {
        expect(DBUtil).to.exist;
    });

    describe('create user ', function () {
        it('exist', function () {
            expect(DBUtil.createUser).to.exist;
        });

        it('shall returns all users', async function () {
            const users = await DBUtil.getAllUsers();
            expect(users).to.be.a('array');
            const preLen = users.length;

            await DBUtil.createUser("fake@fake.com");
            const newUser = await DBUtil.getAllUsers();
            const newLen = newUser.length;
            expect(newLen).to.be.equal(preLen+1);
        });
    });
});