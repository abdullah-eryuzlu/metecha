const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UnblockRequestSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  changedDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
})

const UnblockRequestModel = mongoose.model('unblock', UnblockRequestSchema);
module.exports = UnblockRequestModel;
