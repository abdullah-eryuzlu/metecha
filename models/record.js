const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  patientId: {
    type: String,
    required: true
  },
  diagnostic: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdDate: {
    type: String,
    required: true,
    default: Date.now()
  }
})

const RecordModel = mongoose.model('record', RecordSchema);
module.exports = RecordModel;
