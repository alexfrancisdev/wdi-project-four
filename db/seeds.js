const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
const Building = require('../models/building');
const User = require('../models/user');
// const Tour = require('../models/tour');

const userIds = [
  '5be9860fcb16d525543ceda3',
  '5be9860fcb16d525543ceda4'
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
}];
//
// const tourData = [{
//   name: 'London Tour'
// }];

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase();

  Building.create([{
    name: 'St Paul\'s Cathedral, London',
    architect: 'Sir Christopher Wren',
    icon: 'https://d12dkjq56sjcos.cloudfront.net/pub/media/catalog/product/cache/d9fe7781ddb2422361b5e0fbe1b7086d/b/b/bbt_product_attractions_london_st-pauls.jpg',
    addedBy: userIds[0],
    location: {
      lat: 51.5138,
      lng: 0.0984
    }
  },{
    name: 'Sagrada Familia',
    architect: 'Antoni Gaudí',
    icon: 'https://www.arup.com/-/media/arup/images/projects/s/sagrada-familia/sagrada-familia-2000x1125-2.jpg',
    addedBy: userIds[1],
    location: {
      lat: 41.4036,
      lng: 2.1744
    }
  }])
    .then(buildings => {
      console.log(`${buildings.length} buildings created`);
      // Tour
      //   .create(tourData)
      //   .then(tours => {
      //     console.log(`${tours.length} tours created`);
      //   });
      User
        .create(userData)
        .then(users => {
          console.log(`${users.length} users created`);
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    });
});
