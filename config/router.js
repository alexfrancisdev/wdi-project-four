const router = require('express').Router();
const buildings = require('../controllers/buildings');
const auth = require('../controllers/auth');
const jwt = require('jsonwebtoken');

function secureRoute(req, res, next) {
  if (!req.headers.authorization)
    res.status(401).json({ message: 'unauthorised'});
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, 'hush', function(err) {
    if(err){
      res.status(401).json({ message: 'Unauthorised!' });
    } else {
      req.tokenUserId = jwt.decode(token).sub;
      next();
    }
  });
}

router.route('/buildings')
  .get(buildings.index)
  .post(buildings.create);

router.route('/buildings/:id')
  .get(buildings.show)
  .put(buildings.update)
  .delete(buildings.delete);

router.route('/buildings/:id/like')
  .post(secureRoute, buildings.like);

router.route('/buildings/:id/unlike')
  .post(secureRoute, buildings.unlike);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
