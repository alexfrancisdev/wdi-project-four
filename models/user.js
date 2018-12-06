const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: 'This field is required' },
  email: { type: String, required: 'This field is required' },
  password: { type: String, required: 'This field is required' },
  image: String,
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

userSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.methods.validatePassword = function(attemptedPassword){
  return bcrypt.compareSync(attemptedPassword, this.password);
};

userSchema.virtual('buildingsAdded', {
  ref: 'Building',
  localField: '_id',
  foreignField: 'addedBy'
});

// userSchema.virtual('toursAttending', {
//   ref: 'Tour',
//   localField: '_id',
//   foreignField: 'attendees'
// });

module.exports = mongoose.model('User', userSchema);
