const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
const Building = require('../models/building');
const User = require('../models/user');
const Tour = require('../models/tour');

const userIds = [
  '5be9860fcb16d525543ceda3',
  '5be9860fcb16d525543ceda4',
  '5be9860fcb16d525543ceda5',
  '5be9860fcb16d525543ceda6'
];

const buildingIds = [
  '5c0968f5dc8e460b1e53f07b',
  '5c0968f8dc8e460b1e53f07c',
  '5c0968f9dc8e460b1e53f07d',
  '5c0968f9dc8e460b1e53f07e',
  '5c0968f9dc8e460b1e53f07f',
  '5c0968f9dc8e460b1e53f080',
  '5c0968fadc8e460b1e53f081',
  '5c0968fadc8e460b1e53f082',
  '5c0968fadc8e460b1e53f083',
  '5c0968fbdc8e460b1e53f084',
  '5c0968fbdc8e460b1e53f085',
  '5c0968fbdc8e460b1e53f086',
  '5c0968fcdc8e460b1e53f087',
  '5c0968fcdc8e460b1e53f088',
  '5c0968fcdc8e460b1e53f089',
  '5c0968ffdc8e460b1e53f08a',
  '5c096900dc8e460b1e53f08b',
  '5c096901dc8e460b1e53f08c'
];

const userData = [{
  _id: userIds[0],
  username: 'Sophia',
  email: 's@s.com',
  password: 'pass'
}, {
  _id: userIds[1],
  username: 'Alex',
  email: 'a@a.com',
  password: 'pass'
}, {
  _id: userIds[2],
  username: 'Barry',
  email: 'b@b.com',
  password: 'pass'
}, {
  _id: userIds[3],
  username: 'Claire',
  email: 'c@c.com',
  password: 'pass'
}];

const tourData = [{
  name: 'London Tour',
  description: 'A short tour around central London',
  buildings: [buildingIds[0], buildingIds[1], buildingIds[2], buildingIds[3]],
  createdBy: userIds[3]
}];

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase();

  Building.create([{
    _id: buildingIds[0],
    name: 'St Paul\'s Cathedral, London',
    icon: 'https://d12dkjq56sjcos.cloudfront.net/pub/media/catalog/product/cache/d9fe7781ddb2422361b5e0fbe1b7086d/b/b/bbt_product_attractions_london_st-pauls.jpg',
    addedBy: userIds[0],
    location: {
      lat: 51.513870,
      lng: -0.098362
    }
  }, {
    _id: buildingIds[1],
    name: 'The Shard',
    icon: 'https://teighmore-assets.s3.amazonaws.com/media/filer_public/da/6b/da6bccd2-cec4-489f-bfdb-22944ef66677/tvfts-largetumb.jpg',
    addedBy: userIds[0],
    location: {
      lat: 51.504613,
      lng: -0.086414
    }
  }, {
    _id: buildingIds[2],
    name: 'The Barbican',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Barbican_towers.jpg/1200px-Barbican_towers.jpg',
    addedBy: userIds[1],
    location: {
      lat: 51.5199,
      lng: -0.0945
    }
  }, {
    _id: buildingIds[3],
    name: 'The British Museum',
    icon: 'https://secretldn.com/wp-content/uploads/2018/04/British-Museum-22.jpg',
    addedBy: userIds[2],
    location: {
      lat: 51.519947,
      lng: -0.126699
    }
  },  {
    _id: buildingIds[4],
    name: 'Sagrada Familia',
    icon: 'https://www.arup.com/-/media/arup/images/projects/s/sagrada-familia/sagrada-familia-2000x1125-2.jpg',
    addedBy: userIds[3],
    location: {
      lat: 41.4036,
      lng: 2.1744
    }
  }])
    .then(buildings => {
      console.log(`${buildings.length} buildings created`);
      Tour
        .create(tourData)
        .then(tours => {
          console.log(`${tours.length} tours created`);
        });
      User
        .create(userData)
        .then(users => {
          console.log(`${users.length} users created`);
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    });
});
