const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
      },
      contentDescription: {
        type: String,
      },
      type: {
        type: String,
        enum: ["video", "reading"],
      },
      body: {
        type: String,
      },
      source: {
        type: String,
      },
      courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, 
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;