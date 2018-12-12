/* global api, expect, describe, it, beforeEach */

const Building = require('../../../models/building');

const userIds = [
  '5bea7fbd8df5bf7b16ada180',
  '5bea7fbd8df5bf7b16ada181',
  '5bea7fbd8df5bf7b16ada182'
];

const buildingData = {
  addedBy: userIds[2],
  name: 'Cool Building',
  architect: 'Italy'
};

let buildingId;

describe('Building SHOW', () => {

  beforeEach(done => {
    Building.remove({})
      .then(() => Building.create(buildingData))
      .then(building => {
        buildingId = building._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/buildings/${buildingId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/buildings/${buildingId}`)
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/buildings/${buildingId}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(buildingData.name);
        expect(res.body.architect).to.eq(buildingData.architect);
        done();
      });
  });

});
