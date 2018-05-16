const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BatchSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  recipe: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    default: "Brew Day Prep"
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  status_date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('batches', BatchSchema);