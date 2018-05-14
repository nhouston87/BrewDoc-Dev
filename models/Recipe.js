const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RecipeSchema = new Schema({
  user_id:{
    type: String,
    required: true
  }
});

mongoose.model('recipes', RecipeSchema);