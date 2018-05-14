const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let default_profile_pic_num = (Math.floor(Math.random() * 6) + 1).toString();

//Create Schema
const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  admin:{
    type: Boolean,
    default: false
  },
  locked:{
    type: Boolean,
    default: false
  },
  profile:{
    type: String,
    default: default_profile_pic_num
  },
  public:{
    type: Boolean,
    default: true
  },
  birthdate:{
    type: Date
  },
  brewlevel:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', UserSchema);
