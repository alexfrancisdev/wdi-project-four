const User = require('../models/building');

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

module.exports = {
  follow: follow
};
