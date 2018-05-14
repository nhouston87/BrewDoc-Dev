const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BatchSchema = new Schema({
  user_id:{
    type: String,
    required: true
  }
});

mongoose.model('batches', BatchSchema);