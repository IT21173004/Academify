const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    lessonName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Content', contentSchema);
