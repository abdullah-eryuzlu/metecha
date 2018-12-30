const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  removedDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  pwTry: {
    type: Number,
    required: true,
    default: 0
  },
  isAccountActive: {
    type: Boolean,
    required: true,
    default: false
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  createdBy: {
    type: String,
    required: false
  }
})

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
