const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationSchema = new Schema({
  higherPrioUser: {
    type: String,
    required: true
  },
  lowerPrioUser: {
    type: String,
    required: true
  },
  higherUserType: {
    type: Number,
    required: true
  },
  lowerUserType: {
    type: Number,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const RelationModel = mongoose.model('relation', RelationSchema);
module.exports = RelationModel;
