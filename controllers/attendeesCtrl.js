// const Tour = require('../models/tour');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../config/environment');
// let token;
// let userId;
//
// function getTokenFromHttpRequest(req) {
//   token = req.headers.authorization.replace('Bearer ', '');
//   function retrieveUserIdFromToken(err, result) {
//     userId = result.sub;
//   }
//   jwt.verify(token, secret, retrieveUserIdFromToken);
// }
//
// function indexRoute(req, res, next) {
//   Tour
//     .findById(req.params.tourId)
//     .populate('attendees')
//     .then(tour => res.json(tour.attendees))
//     .catch(next);
// }
//
// function createRoute(req, res, next) {
//   getTokenFromHttpRequest(req);
//   Tour
//     .findById(req.params.tourId)
//     .then(tour => {
//       tour.attendees.push(userId);
//       return tour.save();
//     })
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
// module.exports = {
//   indexRoute: indexRoute,
//   createRoute: createRoute
// };
