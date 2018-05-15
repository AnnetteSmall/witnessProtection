const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  name:{
    type: string,
    required: true
  },
  dob:{
    type: Date,
    required: true
  },
  gender:{
    type: string,
    required: true
  },
  activity:{
    type:string,
    required: true
  },
  height:{
    type:number,
    required:true
  },
  date:{
    type:Date,
    default: Date.now
  }
});

mongoose.model('profile', ProfileSchema);
