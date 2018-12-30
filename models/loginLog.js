const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LoginLogSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  isSuccess: {
    type: Boolean,
    required: true
  },
  reason: {
    type: Number,
    required: false
  },
  ip_addr: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const LoginLogModel = mongoose.model('loginLog', LoginLogSchema);
module.exports = LoginLogModel;
