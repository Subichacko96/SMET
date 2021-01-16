const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    place: {
      type: String 
    },
    phone: {
      type: Number,
      unique: true
    },
    university: {
      type: String   
    },
    website: {
      type: String,
      unique: true
    },
    remarks: {
      type: String,
      trim: true
    },
    course_id: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Course'
     }

  },
  { timestamps: true }
);

const Colleges = mongoose.model('Colleges',collegeSchema);

module.exports =  Colleges;
