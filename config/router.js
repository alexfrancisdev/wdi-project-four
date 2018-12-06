const router = require('express').Router();
const buildings = require('../controllers/buildings');
// const tours = require('../controllers/tours');
const auth = require('../controllers/auth');
// const attendees= require('../controllers/attendees');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });
  const token = req.headers.authorization.replace('Bearer ', '');
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    });
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if(!user) return res.status(401).json({ message: 'Unauthorized' });
      req.currentUser = user;
      next();
    })
    .catch(next);
}
// function secureRoute(req, res, next) {
//   if (!req.headers.authorization)
//     res.status(401).json({ message: 'unauthorised'});
//   const token = req.headers.authorization.replace('Bearer ', '');
//   jwt.verify(token, 'hush', function(err) {
//     if(err){
//       res.status(401).json({ message: 'Unauthorised!' });
//     } else {
//       req.tokenUserId = jwt.decode(token).sub;
//       next();
//     }
//   });
// }

router.route('/buildings')
  .get(buildings.index)
  .post(buildings.create);

router.route('/buildings/:id')
  .get(buildings.show)
  .put(buildings.update)
  .delete(buildings.delete);

router.post('/buildings/:id/comments', secureRoute, buildings.commentCreate);
router.delete('/buildings/:id/comments/:commentId', secureRoute, buildings.commentDelete);

router.route('/buildings/:id/like')
  .post(secureRoute, buildings.like);

router.route('/buildings/:id/unlike')
  .post(secureRoute, buildings.unlike);



router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;

// TOURS
// router.route('/tours')
//   .get(tours.index)
//   .post(tours.create);
//
// router.route('/tours/:id')
//   .get(tours.show)
//   .put(tours.update)
//   .delete(tours.delete);
//
// router.post('/tours/:id/comments', secureRoute, tours.commentCreate);
// router.delete('/tours/:id/comments/:commentId', secureRoute, tours.commentDelete);
//
// router.route('/events/:tourId/attendees')
//   .get(attendees.indexRoute)
//   .post(secureRoute, attendees.createRoute);
//
// router.route('/tours/:id/like')
//   .post(secureRoute, tours.like);
//
// router.route('/tours/:id/unlike')
//   .post(secureRoute, tours.unlike);
