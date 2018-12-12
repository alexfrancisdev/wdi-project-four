/* global api, expect, describe, it, beforeEach */

const User = require('../../../models/user');


const userData = [
  {
    username: 'Dave',
    email: 'd@d.com',
    password: 'pass'
  },
  {
    username: 'Kate',
    email: 'k@k.com',
    password: 'pass'
  },
  {
    username: 'Mike',
    email: 'm@m.com',
    password: 'pass'
  }
];

describe('User INDEX', () => {

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/users')
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/users')
      .end((err, res) => {
        // use res.body.forEach
        res.body.forEach(item => expect(item).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/users')
      .end((err, res) => {
        res.body.forEach(user => {
          // The INDEX route is quite tricky to test, because Mongo doesn't
          // create the desserts in any particular order! We have to find
          // the right dessert in dessertData to compare against each
          // element of the response from the INDEX route.
          const dataItem = userData.find(item => item.username === user.username);
          expect(user.username).to.eq(dataItem.username);

        });
        done();
      });
  });

});
