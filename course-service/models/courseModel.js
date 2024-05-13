const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
      InstructorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
      },
      courseID: {
        type: String,
        required: true,
      },
      courseName: {
        type: String,
        required: true,
      },
      courseInstructor: {
        type: String,
      },
      courseDuration: {
        type: Number,
      },
      courseDescription: {
        type: String,
      },
      coursePrice: {
        type: Number,
        required: true,
      }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;