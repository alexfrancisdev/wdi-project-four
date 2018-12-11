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
    .populate('comments.user addedBy featuredOn')
    .exec()
    .then(building => res.json(building))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.addedBy = req.currentUser;
  console.log('the body', req.body);
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
  console.log('req.body', req.body);
  req.body.user = req.currentUser;
  console.log('req.body', req.body);
  Building
    .findById(req.params.id)
    .populate('comments.user addedBy featuredOn')
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
    .populate('comments.user addedBy featuredOn')
    .then(building => {
      const comment = building.comments.id(req.params.commentId);
      console.log('=======> MADE IT!!!!!', comment.user._id);
      if(!comment.user._id.equals(req.currentUser._id)) {
        throw new Error('Unauthorized');
      }
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
      if (!building.likes.find(userId => userId.toString() === req.tokenUserId)) {
        building.likes.push(req.tokenUserId);
        return building.save();
      } else {
        res.status(422).json({ message: 'Cannot like twice'});
        next();
      }
    })
    .then(building => res.json(building))
    .catch(next);
}

function unlike(req, res, next) {
  console.log('I DO NOT LIKE!');
  Building
    .findById(req.params.id)
    .then(building => {
      if (!building.likes.find(userId => userId.toString() === req.tokenUserId)) {
        res.status(422).json({ message: 'No like to remove'});
      } else {
        building.likes = building.likes.filter(x => x.toString() !== req.tokenUserId);
        return building.save();
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
  like: like,
  unlike: unlike
};
