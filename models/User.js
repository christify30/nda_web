const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  servicenumber:{
   type:String,
   required:true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  armofservice: {
    type: String,
    required:true
  }
});

module.exports = User = mongoose.model('users', UserSchema);
