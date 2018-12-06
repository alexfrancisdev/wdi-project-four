const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .populate('buildingsAdded following')
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('buildingsAdded following')
    .select('-password')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

function follow(req, res, next) {
  console.log('I\'ll be watching you');
  User
    .findById(req.params.id)
    .then(user => {
      if (!user.followedBy.find(userId => userId.toString() === req.tokenUserId)) {
        user.followedBy.push(req.tokenUserId);
        return user.save();
      } else {
        res.status(422).json({ message: 'Already following'});
        next();
      }
    })
    .then(user => res.json(user))
    .catch(next);
}

function unfollow(req, res, next) {
  console.log('I\'ve seen enough!');
  User
    .findById(req.params.id)
    .then(user => {
      if (!user.followedBy.find(userId => userId.toString() === req.tokenUserId)) {
        res.status(422).json({ message: 'You do not follow this user'});
      } else {
        user.followedBy = user.followedBy.filter(x => x.toString() !== req.tokenUserId);
        return user.save();
      }
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  follow: follow,
  unfollow: unfollow
};
