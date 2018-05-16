const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RecipeSchema = new Schema({
  user:{
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
  creation_date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('recipes', RecipeSchema);