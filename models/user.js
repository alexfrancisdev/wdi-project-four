const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: 'This field is required' },
  email: { type: String, required: 'This field is required' },
  password: { type: String, required: 'This field is required' },
  image: String,
  followedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
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

userSchema.virtual('following', {
  ref: 'User',
  localField: '_id',
  foreignField: 'followedBy'
});

userSchema.virtual('toursCreated', {
  ref: 'Tour',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
