/* global api, expect, describe, it, beforeEach */

const Tour = require('../../../models/tour');
const userIds = [
  '5bea7fbd8df5bf7b16ada180',
  '5bea7fbd8df5bf7b16ada181',
  '5bea7fbd8df5bf7b16ada182'
];

const tourData = [
  {
    createdBy: userIds[0],
    name: 'London Trip',
    description: 'description 1'
  },
  {
    createdBy: userIds[1],
    name: 'Tour of Barcelona',
    description: 'description 2'
  },
  {
    createdBy: userIds[0],
    name: 'Lisbon Gems',
    description: 'description 3'
  },
  {
    createdBy: userIds[2],
    name: 'Califonia Road Trip',
    description: 'description 4'
  }
];

describe('Tour INDEX', () => {

  beforeEach(done => {
    Tour.remove({})
      .then(() => Tour.create(tourData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/tours')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/tours')
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/tours')
      .end((err, res) => {
        // use res.body.forEach
        res.body.forEach(item => expect(item).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/tours')
      .end((err, res) => {
        res.body.forEach(tour => {
          // The INDEX route is quite tricky to test, because Mongo doesn't
          // create the desserts in any particular order! We have to find
          // the right dessert in dessertData to compare against each
          // element of the response from the INDEX route.
          const dataItem = tourData.find(item => item.name === tour.name);
          expect(tour.name).to.eq(dataItem.name);

        });
        done();
      });
  });

});
