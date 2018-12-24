const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { makeMockModels } = require('sequelize-test-helpers')

const mockModels = makeMockModels({ User: { findOne: sinon.stub() } })
