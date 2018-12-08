const router = require('express').Router();
const buildings = require('../controllers/buildings');
const tours = require('../controllers/tours');
const auth = require('../controllers/auth');
const user = require('../controllers/user');
// const attendees= require('../controllers/attendees');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');
// const secureRoute = require('../lib/secureRoute');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized 1' });
  const token = req.headers.authorization.replace('Bearer ', '');
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    });
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if(!user) return res.status(401).json({ message: 'Unauthorized 2' });
      req.currentUser = user;
      console.log('req.currentUser', req.currentUser);
      req.tokenUserId = jwt.decode(token).sub;
      next();
    })
    .catch(next);
}

router.route('/buildings')
  .get(buildings.index)
  .post(secureRoute, buildings.create);

router.route('/buildings/:id')
  .get(buildings.show)
  .put(secureRoute, buildings.update)
  .delete(secureRoute, buildings.delete);

router.post('/buildings/:id/comments', secureRoute, buildings.commentCreate);
router.delete('/buildings/:id/comments/:commentId', secureRoute, buildings.commentDelete);

router.route('/buildings/:id/like')
  .post(secureRoute, buildings.like);

router.route('/buildings/:id/unlike')
  .post(secureRoute, buildings.unlike);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/users')
  .get(user.index);

router.route('/users/:id')
  .get(user.show);

router.route('/users/:id/follow')
  .post(secureRoute, user.follow);

router.route('/users/:id/unfollow')
  .post(secureRoute, user.unfollow);

router.route('/tours')
  .get(tours.index)
  .post(secureRoute, tours.create);

router.route('/tours/:id')
  .get(tours.show)
  .put(secureRoute, tours.update)
  .delete(secureRoute, tours.delete);

router.post('/tours/:id/comments', secureRoute, tours.commentCreate);
router.delete('/tours/:id/comments/:commentId', secureRoute, tours.commentDelete);

router.route('/tours/:id/like')
  .post(secureRoute, tours.like);

router.route('/tours/:id/unlike')
  .post(secureRoute, tours.unlike);

module.exports = router;
