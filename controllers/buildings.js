const Building = require('../models/building');

function indexRoute(req, res, next) {
  Building
    .find()
    .exec()
    .then(buildings => res.json(buildings))
    .catch(next);
}

function showRoute(req, res, next) {
  Building
    .findById(req.params.id)
    // .populate('comments.user')
    .exec()
    .then(building => res.json(building))
    .catch(next);
}

function createRoute(req, res, next) {
  Building
    .create(req.body)
    .then(building => res.status(201).json(building))
    .catch(next);
}

function updateRoute(req, res, next) {
  Building
    .findById(req.params.id)
    .exec()
    .then(building => {
      Object.assign(building, req.body);
      return building.save();
    })
    .then(building => res.json(building))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Building
    .findById(req.params.id)
    .exec()
    .then(building => building.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  console.log('!!!!!!!', req.body);
  Building
    .findById(req.params.id)
    .populate('comments.user')
    .exec()
    .then(building => {
      building.comments.push(req.body);
      return building.save();
    })
    .then(building => res.json(building))
    .catch(next);
}

function commentDeleteRoute(req, res, next) {
  Building
    .findById(req.params.id)
    .populate('comments.user')
    .then(building => {
      const comment = building.comments.id(req.params.commentId);
      console.log('=======> MADE IT!!!!!', comment);
      // if(!comment.user._id.equals(req.currentUser._id)) {
      //   throw new Error('Unauthorized');
      // }
      comment.remove();
      return building.save();
    })
    .then(building => res.json(building))
    .catch(next);
}

function like(req, res, next) {
  console.log('Me like!!!');
  Building
    .findById(req.params.id)
    .then(building => {
      console.log('got this far');
      console.log('Id is ', req.params.id);
      if (!building.likes.find(userId => userId.toString() === req.tokenUserId)) {
        building.votes.push('good boy');
        return building.save();
      } else {
        res.status(422).json({ message: 'Cannot vote twice'});
        next();
      }
    })
    .then(building => res.json(building))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute,
  like: like
};
