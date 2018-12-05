process.env.NODE_ENV = 'test';

global.Promise = require('bluebird');

const chai = require('chai');
global.should = chai.should();
global.expect = chai.expect;

const supertest = require('supertest');
const server = require('../../index');
global.api = supertest(server);
