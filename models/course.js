const mongoose = require('mongoose');
const Section = require('./section');

const courseSchema = new mongoose.Schema({
  course_name: { type: String,
                 trim: true },

   college_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'College'
   },

  section_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Section'
   }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
