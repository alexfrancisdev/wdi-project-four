const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
const Building = require('../models/building');
const User = require('../models/user');
const Tour = require('../models/tour');

const userData = [{
  username: 'Sophia',
  email: 's@s.com',
  password: 'pass'
}, {
  username: 'Alex',
  email: 'a@a.com',
  password: 'pass'
}];

const tourData = [{
  name: 'London Tour'
}];

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase();

  Building.create([{
    name: 'St Paul\'s Cathedral, London',
    icon: 'https://d12dkjq56sjcos.cloudfront.net/pub/media/catalog/product/cache/d9fe7781ddb2422361b5e0fbe1b7086d/b/b/bbt_product_attractions_london_st-pauls.jpg'
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
