const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActivationSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  activationHash: {
    type: String,
    required: true
  },
  activationDate: {
    type: Date,
    required: false,
  }
})

const UserActivationModel = mongoose.model('userActivation', UserActivationSchema);
module.exports = UserActivationModel;
