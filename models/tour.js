const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: { type: String, required: 'This field is required' },
  description: { type: String, required: 'This field is required' },
  buildings: {
    type: mongoose.Schema.ObjectId,
    ref: 'Building'
  },
  image: String,
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [{
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    timestamps: true
  }],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Tour', tourSchema);
