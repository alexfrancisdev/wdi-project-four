const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}


function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('buildingsAdded')
    .select('-password')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
