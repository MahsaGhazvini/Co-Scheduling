'use strict';

const chai = require('chai');
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('User - UserService (using sequelizeMockingMocha) - ', function () {
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

    // Load fake data for the users
    sequelizeMockingMocha(
        Database,
        path.resolve(path.join(__dirname, './users.json')),
        { 'logging': false }
    );

    it('the service shall exist', function () {
        chai.expect(DBUtil).to.exist;
    });

    describe('get all users ', function () {
        it('exist', function () {
            chai.expect(DBUtil.getAllUsers).to.exist;
        });

        it('shall returns all users', function () {
            return DBUtil
                .getAllUsers()
                .then(function (users) {
                    console.log(users)
                    chai.expect(users).deep.equals([{
                        'email': 'hayerisadegh@gmail.com'
                    }]);
                });
        });
    });
});