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
  '5be9860fcb16d525543ceda6',
  '5be9860fcb16d525543ceda7',
  '5be9860fcb16d525543ceda8'
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
  '5c096901dc8e460b1e53f08c',
  '5c096901dc8e460b1e53f07d',
  '5be9860fcb16d525543ceda1',
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3',
  '5be9860fcb16d525543ceda4',
  '5be9860fcb16d525543ceda5',
  '5be9860fcb16d525543ceda6'
];

const userData = [{
  _id: userIds[0],
  username: 'Sophia',
  email: 's@s.com',
  password: 'pass',
  image: 'https://i.imgur.com/frnDmn4.png',
  followedBy: [userIds[1], userIds[3], userIds[4]]
}, {
  _id: userIds[1],
  username: 'Alex',
  email: 'a@a.com',
  password: 'pass',
  image: 'https://i.imgur.com/5YyQ1pB.png',
  followedBy: [userIds[0], userIds[2], userIds[5]]
}, {
  _id: userIds[2],
  username: 'Rob',
  email: 'r@r.com',
  password: 'pass',
  image: 'https://pbs.twimg.com/profile_images/772169820443906048/x3KF8-Xz_400x400.jpg',
  followedBy: [userIds[0], userIds[1]]
}, {
  _id: userIds[3],
  username: 'Ellie',
  email: 'e@e.com',
  password: 'pass',
  image: 'https://avatars3.githubusercontent.com/u/36162267?s=460&v=4',
  followedBy: [userIds[4], userIds[1]]
}, {
  _id: userIds[4],
  username: 'Matt',
  email: 'm@m.com',
  password: 'pass',
  image: 'https://avatars2.githubusercontent.com/u/35869244?s=460&v=4'
}, {
  _id: userIds[5],
  username: 'Jumee',
  email: 'j@j.com',
  password: 'pass',
  image: 'https://avatars0.githubusercontent.com/u/37407768?s=460&v=4',
  followedBy: [userIds[0], userIds[1]]
}];

const tourData = [{
  name: 'London Tour',
  description: 'A short tour around central London',
  buildings: [buildingIds[0], buildingIds[1], buildingIds[2], buildingIds[3]],
  createdBy: userIds[3]
}, {
  name: 'LA Modernism Tour',
  description: 'Los Angeles is a mecca for modern architecture and an ideal destination to explore the work of the legendary architects synonymous with home design from the 1920s to the 1950s.',
  buildings: [buildingIds[7], buildingIds[8], buildingIds[9], buildingIds[10], buildingIds[11], buildingIds[12], buildingIds[13], buildingIds[14]],
  createdBy: userIds[1]
}];

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase();

  Building.create([{
    _id: buildingIds[0],
    name: 'St Paul\'s Cathedral',
    architect: 'Sir Christopher Wren',
    icon: 'https://d12dkjq56sjcos.cloudfront.net/pub/media/catalog/product/cache/d9fe7781ddb2422361b5e0fbe1b7086d/b/b/bbt_product_attractions_london_st-pauls.jpg',
    addedBy: userIds[0],
    comments: [{
      content: 'Christopher Wren is a 10 out of 10',
      user: userIds[0]}],
    location: {
      lat: 51.513870,
      lng: -0.098362
    }
  }, {
    _id: buildingIds[1],
    name: 'The Shard',
    architect: 'Renzo Piano',
    icon: 'https://teighmore-assets.s3.amazonaws.com/media/filer_public/da/6b/da6bccd2-cec4-489f-bfdb-22944ef66677/tvfts-largetumb.jpg',
    addedBy: userIds[0],
    comments: [{
      content: 'Big and pointy!!!',
      user: userIds[2]}],
    location: {
      lat: 51.504613,
      lng: -0.086414
    }
  }, {
    _id: buildingIds[2],
    name: 'The Barbican',
    architect: 'Chamberlin, Powell and Bon',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Barbican_towers.jpg/1200px-Barbican_towers.jpg',
    addedBy: userIds[1],
    comments: [{
      content: 'A great example of brutalism in London. Also check out Trellick Tower',
      user: userIds[1]
    }, {
      content: 'I LOVE brutalism',
      user: userIds[0]
    }],
    location: {
      lat: 51.5199,
      lng: -0.0945
    },
    likes: [userIds[0], userIds[1]]
  }, {
    _id: buildingIds[3],
    name: 'The British Museum',
    architect: 'Sir Robert Smirke',
    icon: 'https://secretldn.com/wp-content/uploads/2018/04/British-Museum-22.jpg',
    addedBy: userIds[5],
    location: {
      lat: 51.519947,
      lng: -0.126699
    }
  },  {
    _id: buildingIds[4],
    name: 'Sagrada Familia',
    architect: 'Antoni Gaudí',
    icon: 'https://www.arup.com/-/media/arup/images/projects/s/sagrada-familia/sagrada-familia-2000x1125-2.jpg',
    addedBy: userIds[3],
    comments: [{
      content: 'Will this ever be completed?',
      user: userIds[1]}],
    location: {
      lat: 41.4036,
      lng: 2.1744
    }
  }, {
    _id: buildingIds[5],
    name: 'The Forbidden City',
    architect: 'Cai Xin, Nguyễn An, Kuai Xiang, Lu Xiang and others',
    icon: 'https://www.wonders-of-the-world.net/Forbidden-city/images/Vignettes/Description/Mur-Est-de-la-cour-aux-eaux-d-or-01-V.jpg',
    addedBy: userIds[0],
    comments: [{
      content: 'Such an impressive place',
      user: userIds[2]}],
    location: {
      lat: 39.916164,
      lng: 116.397079
    }
  }, {
    _id: buildingIds[6],
    name: 'Light House',
    architect: 'Gianni Botsford Architects',
    icon: 'http://www.giannibotsford.com/media/thumbnails/uploads/light-house/st-john-06_slides.jpg',
    addedBy: userIds[3],
    location: {
      lat: 51.510369,
      lng: -0.201347
    }
  }, {
    _id: buildingIds[7],
    id: '0',
    name: 'Coachella Valley Savings & Loan bank',
    architect: 'E Stewart Williams',
    addedBy: userIds[3],
    icon: 'https://static.dezeen.com/uploads/2018/02/coachella-valley-savings-e-stewart-williams-bank-mid-century-palm-springs-modernism-week_dezeen_hero-852x479.jpg',
    location: {
      lat: 33.817843,
      lng: -116.547098
    }
  },
  {
    _id: buildingIds[8],
    name: 'Palm Springs City Hall',
    architect: 'Albert Frey',
    addedBy: userIds[0],
    icon: 'http://4.bp.blogspot.com/-TG3YI-5zLWs/TdGF3sC2n1I/AAAAAAAAJGk/L_RXaiv75fs/s1600/palm_springs_city_hall_img.jpg',
    location: {
      lat: 33.823838,
      lng: -116.511841
    }
  },
  {
    _id: buildingIds[9],
    name: 'Elrod House',
    architect: 'John Lautner',
    addedBy: userIds[3],
    icon: 'http://www.eichlernetwork.com/sites/default/files/images/homefront/hf_6_17_16_C.jpg',
    location: {
      lat: 33.793499,
      lng: -116.510999
    }
  },
  {
    _id: buildingIds[10],
    name: 'Kaufmann House',
    architect: 'Richard Neutra',
    addedBy: userIds[0],
    icon: 'https://static.dezeen.com/uploads/2018/02/kaufmann-house-richard-neutra-palm-springs-tom-blachford-midnight-modernism-photography_dezeen_2364_col_2-1704x1137.jpg',
    location: {
      lat: 33.845202,
      lng: -116.552976
    }
  },
  {
    _id: buildingIds[11],
    name: 'Case Study House #22',
    architect: 'Pierre Koenig',
    addedBy: userIds[1],
    icon: 'http://www.architectureoflife.net/wp-content/uploads/2013/07/2011iN-EN-iYi-EVLERi-The-Stahl-Evi-4.jpg',
    location: {
      lat: 34.100487,
      lng: -118.370186
    }
  },
  {
    _id: buildingIds[12],
    name: 'Salk Institute',
    architect: 'Louis Kahn',
    addedBy: userIds[5],
    icon: 'https://static.dezeen.com/uploads/2017/07/salk-institute-louis-khan-teak-restoration-california-usa_dezeen_hero-852x479.jpg',
    location: {
      lat: 32.887040,
      lng: -117.245450
    }
  },
  {
    _id: buildingIds[13],
    name: 'Geisel Library',
    architect: 'William Pereira',
    addedBy: userIds[1],
    icon: 'https://ucpa.ucsd.edu/images/work/_standard/geisel-wss-1.jpg',
    location: {
      lat: 32.881097,
      lng: -117.237536
    }
  },
  {
    _id: buildingIds[14],
    name: 'Tramway Gas Station',
    architect: 'Albert Frey & Robson Chambers',
    addedBy: userIds[3],
    icon: 'http://4.bp.blogspot.com/-5q_wX2ICuoA/T8RORizTrpI/AAAAAAAANsI/GnLcnUBWEAA/s1600/Albert_Frey_Palm_Springs.jpg',
    location: {
      lat: 33.858291,
      lng: -116.558131
    }
  }, {
    _id: buildingIds[15],
    name: 'Les Espaces d’Abraxas',
    architect: 'Ricardo Bofill',
    addedBy: userIds[4],
    likes: [userIds[0], userIds[1]],
    icon: 'http://www.aestheticamagazine.com/wp-content/uploads/2016/04/Laurent-Kronental_Souvenir-dun-Futur-4.jpg',
    location: {
      lat: 48.840068,
      lng: 2.542297
    }
  }, {
    _id: buildingIds[16],
    name: 'Walden 7',
    architect: 'Ricardo Bofill',
    addedBy: userIds[4],
    likes: [userIds[0], userIds[2]],
    icon: 'http://barcelonanavigator.com/wp-content/uploads/2017/09/Walden-7-b.jpg',
    location: {
      lat: 41.380266,
      lng: 2.067771
    }
  }, {
    _id: buildingIds[17],
    name: 'Guggenheim Museum Bilbao',
    architect: 'Frank Gehry',
    addedBy: userIds[5],
    likes: [userIds[2]],
    icon: 'https://www.dosde.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/m/u/museo-guggenheim-bilbao-arquitectura-contemporanea-dosde-publishing_978-84-15818-50-2_25-006-00_C11.jpg',
    location: {
      lat: 43.268679,
      lng: -2.933969
    }
  }, {
    _id: buildingIds[18],
    name: 'Fallingwater',
    architect: 'Frank Lloyd Wright',
    addedBy: userIds[4],
    likes: [userIds[5]],
    icon: 'http://www.phaidon.com/resource/corsiniclassicsummer.jpg',
    location: {
      lat: 39.906324,
      lng: -79.467878
    }
  }, {
    _id: buildingIds[19],
    name: 'Solomon R. Guggenheim Museum',
    architect: 'Frank Lloyd Wright',
    addedBy: userIds[4],
    likes: [userIds[5]],
    icon: 'https://static.dezeen.com/uploads/2017/06/solomon-r-guggenheim-frank-lloyd-wright-new-york-150th-birthday_dezeen_sq.jpg',
    location: {
      lat: 40.783012,
      lng: -73.958981
    }
  }, {
    _id: buildingIds[20],
    name: 'Johnson Wax Headquarters',
    architect: 'Frank Lloyd Wright',
    addedBy: userIds[4],
    likes: [userIds[5]],
    icon: 'https://static.dezeen.com/uploads/2017/06/johnson-wax-frank-lloyd-wright-racine-wisconsin_dezeen_sq.jpg',
    location: {
      lat: 42.715251,
      lng: -87.790644
    }
  }, {
    _id: buildingIds[21],
    name: 'The National Theatre, London',
    architect: 'Denys Lasdun',
    addedBy: userIds[4],
    likes: [userIds[5]],
    icon: 'http://www.uncubemagazine.com/sixcms/media.php/1323/National%20Theatre%20from%20the%20northeast%20Photo%20by%20Philip%20Vile%20copy.jpg',
    location: {
      lat: 51.506967,
      lng: -0.114102
    }
  }, {
    _id: buildingIds[22],
    name: 'Lloyd\'s Building',
    architect: 'Richard Rogers and Partners',
    addedBy: userIds[4],
    likes: [userIds[5]],
    icon: 'https://i.pinimg.com/originals/0a/15/0f/0a150f7b8bdb25fda56a4e82929db761.jpg',
    location: {
      lat: 51.512697,
      lng: -0.082243
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
