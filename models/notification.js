const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotificationSchema = new Schema({
  sendBy: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  recordId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const NotificationModel = mongoose.model('notification', NotificationSchema);
module.exports = NotificationModel;
