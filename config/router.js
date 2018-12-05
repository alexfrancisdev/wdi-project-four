const router = require('express').Router();
const buildings = require('../controllers/buildings');
const auth = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');

router.route('/buildings')
  .get(buildings.index)
  .post(buildings.create);

router.route('/buildings/:id')
  .get(buildings.show)
  .put(buildings.update)
  .delete(buildings.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
