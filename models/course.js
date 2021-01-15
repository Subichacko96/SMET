const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_name: { type: String,
                 trim: true },

  college_id: { type: String,
     unique: true },

  section_id: { type: String,
      unique: true },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
