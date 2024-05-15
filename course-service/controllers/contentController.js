const Content = require('../models/contentModel');
const bucket = require('../firebaseAdmin');
const { v4: uuidv4 } = require('uuid');

// Create a new content with file upload
exports.createContent = async (req, res) => {
  const { courseID, lessonNumber, lessonName, content, fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: 'No file URL provided' });
  }

  const newContent = new Content({
    courseID,
    lessonNumber,
    lessonName,
    content,
    fileUrl
  });

  try {
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Controller to view all content for a specific course
exports.viewAllContentForCourse = async (req, res) => {
  const courseId = req.params.courseId; // Assuming courseId is passed in the URL

  try {
    // Fetch all content related to the specific course from the database
    const courseContent = await Content.find({ courseID: courseId });

    if (!courseContent) {
      return res.status(404).json({ message: 'No content found for this course' });
    }

    res.status(200).json(courseContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to view specific content
exports.viewContent = async (req, res) => {
  const contentId = req.params.contentId; // Assuming contentId is passed in the URL

  try {
    // Fetch the specific content from the database
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
