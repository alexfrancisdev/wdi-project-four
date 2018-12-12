/* global api, expect, describe, it, beforeEach */

const Building = require('../../../models/building');
const userIds = [
  '5bea7fbd8df5bf7b16ada180',
  '5bea7fbd8df5bf7b16ada181',
  '5bea7fbd8df5bf7b16ada182'
];

const buildingData = [
  {
    addedBy: userIds[0],
    name: 'Taj Mahal',
    architect: 'architect 1'
  },
  {
    addedBy: userIds[1],
    name: 'Burj Khalifa',
    architect: 'architect 2'
  },
  {
    addedBy: userIds[0],
    name: 'The Gherkin',
    architect: 'architect 3'
  },
  {
    addedBy: userIds[2],
    name: 'Eiffel Tower',
    architect: 'architect 4'
  }
];

describe('Building INDEX', () => {

  beforeEach(done => {
    Building.remove({})
      .then(() => Building.create(buildingData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/buildings')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/buildings')
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/buildings')
      .end((err, res) => {
        // use res.body.forEach
        res.body.forEach(item => expect(item).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/buildings')
      .end((err, res) => {
        res.body.forEach(building => {
          // The INDEX route is quite tricky to test, because Mongo doesn't
          // create the desserts in any particular order! We have to find
          // the right dessert in dessertData to compare against each
          // element of the response from the INDEX route.
          const dataItem = buildingData.find(item => item.name === building.name);
          expect(building.name).to.eq(dataItem.name);

        });
        done();
      });
  });

});
