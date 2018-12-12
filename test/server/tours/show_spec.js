/* global api, expect, describe, it, beforeEach */

const Tour = require('../../../models/tour');

const userIds = [
  '5bea7fbd8df5bf7b16ada180',
  '5bea7fbd8df5bf7b16ada181',
  '5bea7fbd8df5bf7b16ada182'
];

const tourData = {
  addedBy: userIds[2],
  name: 'Cool Tour',
  description: 'Best of Italy'
};

let tourId;

describe('Tour SHOW', () => {

  beforeEach(done => {
    Tour.remove({})
      .then(() => Tour.create(tourData))
      .then(tour => {
        tourId = tour._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/tours/${tourId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/tours/${tourId}`)
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/tours/${tourId}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(tourData.name);
        expect(res.body.description).to.eq(tourData.description);
        done();
      });
  });

});
