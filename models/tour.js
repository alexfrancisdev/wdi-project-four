const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: { type: String, required: 'This field is required' },
  description: String,
  buildings: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Building'
  }],
  image: String,
  comments: [{
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    time: { type: Date, default: Date.now }
  }],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tour', tourSchema);
