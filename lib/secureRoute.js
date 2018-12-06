const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secret } = require('../config/environment');

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
      req.tokenUserId = jwt.decode(token).sub;
      next();
    })
    .catch(next);
}

module.exports = {secureRoute: secureRoute};
