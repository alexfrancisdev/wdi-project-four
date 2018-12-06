// const Tour = require('../models/tour');
//
// function indexRoute(req, res, next) {
//   Tour
//     .find()
//     .exec()
//     .then(tours => res.json(tours))
//     .catch(next);
// }
//
// function showRoute(req, res, next) {
//   Tour
//     .findById(req.params.id)
//     // .populate('comments.user')
//     .populate('attendees')
//     .exec()
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
// function createRoute(req, res, next) {
//   Tour
//     .create(req.body)
//     .then(tour => res.status(201).json(tour))
//     .catch(next);
// }
//
// function updateRoute(req, res, next) {
//   Tour
//     .findById(req.params.id)
//     .exec()
//     .then(tour => {
//       Object.assign(tour, req.body);
//       return tour.save();
//     })
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
// function deleteRoute(req, res, next) {
//   Tour
//     .findById(req.params.id)
//     .exec()
//     .then(tour => tour.remove())
//     .then(() => res.sendStatus(204))
//     .catch(next);
// }
//
// function commentCreateRoute(req, res, next) {
//   req.body.user = req.currentUser;
//   Tour
//     .findById(req.params.id)
//     .populate('comments.user')
//     .exec()
//     .then(tour => {
//       tour.comments.push(req.body);
//       return tour.save();
//     })
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
// function commentDeleteRoute(req, res, next) {
//   Tour
//     .findById(req.params.id)
//     .populate('comments.user')
//     .then(tour => {
//       const comment = tour.comments.id(req.params.commentId);
//       console.log('=======> MADE IT!!!!!', comment.user._id);
//       if(!comment.user._id.equals(req.currentUser._id)) {
//         throw new Error('Unauthorized');
//       }
//       comment.remove();
//       return tour.save();
//     })
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
// function like(req, res, next) {
//   console.log('Me like!!!');
//   Tour
//     .findById(req.params.id)
//     .then(tour => {
//       if (!tour.likes.find(userId => userId.toString() === req.tokenUserId)) {
//         tour.likes.push(req.tokenUserId);
//         return tour.save();
//       } else {
//         res.status(422).json({ message: 'Cannot like twice'});
//         next();
//       }
//     })
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
// function unlike(req, res, next) {
//   console.log('I DO NOT LIKE!');
//   Tour
//     .findById(req.params.id)
//     .then(tour => {
//       if (!tour.likes.find(userId => userId.toString() === req.tokenUserId)) {
//         res.status(422).json({ message: 'No like to remove'});
//       } else {
//         tour.likes = tour.likes.filter(x => x.toString() !== req.tokenUserId);
//         return tour.save();
//       }
//     })
//     .then(tour => res.json(tour))
//     .catch(next);
// }
//
//
// module.exports = {
//   index: indexRoute,
//   show: showRoute,
//   create: createRoute,
//   update: updateRoute,
//   delete: deleteRoute,
//   commentCreate: commentCreateRoute,
//   commentDelete: commentDeleteRoute,
//   like: like,
//   unlike: unlike
// };
