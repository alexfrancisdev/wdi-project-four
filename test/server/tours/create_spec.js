/* global describe, it, expect, api, beforeEach */

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

// TODO: add secret to environment file
const { secret } = require('../../../config/environment');

const Tour = require('../../../models/tour');
const userIds = [
  '5bea7fbd8df5bf7b16ada180'
];
const tourData = {
  createdBy: userIds[0],
  name: 'Test Tour',
  description: 'description 1'
};

let token;

describe('Tour CREATE', () => {

  beforeEach(done => {
    Tour.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        email: 'test',
        username: 'test',
        password: 'test'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    // NOTE: This requires a change to the app! I've updated
    // secureRoute to pass this test...
    api.post('/api/tours')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {
    // NOTE: This test requires a change to the app!
    // I've updated the CREATE route (see dessertController)
    api.post('/api/tours')
      .set('Authorization', `Bearer ${token}`)
      .send(tourData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/tours')
      .set('Authorization', `Bearer ${token}`)
      .send(tourData)
      .end((err, res) => {
        // test the type of res.body
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/tours')
      .set('Authorization', `Bearer ${token}`)
      .send(tourData)
      .end((err, res) => {
        // test the contents of res.body against the test data
        expect(res.body.name).to.eq(tourData.name);
        expect(res.body.description).to.eq(tourData.description);
        done();
      });
  });
});
