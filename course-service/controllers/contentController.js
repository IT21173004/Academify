const Content = require('../models/contentModel');
const bucket = require('../firebaseAdmin');
const { v4: uuidv4 } = require('uuid');

// Create a new content with file upload
exports.createContent = async (req, res) => {
  const { lessonNumber, lessonName, content, fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: 'No file URL provided' });
  }

  const newContent = new Content({
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
