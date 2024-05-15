const Enroll = require(`../models/enrollmentModel`);

const enroll = async (req, res, next) => {
    try {
        const { learnerId, courseId, email, phoneNumber } = req.body; // Retrieve learnerId, courseId, email, phoneNumber from req.body

        // Check if the enrollment already exists
        const existingEnroll = await Enroll.findOne({ learner: learnerId, course: courseId });
        if (existingEnroll) throw new Error('Enrollment already exists');

        // Create new enrollment
        const newEnroll = new Enroll({ learner: learnerId, course: courseId, email, mobilenumber: phoneNumber }); // Ensure to use "mobilenumber" in the model
        const savedEnroll = await newEnroll.save();

        res.status(201).json({ message: 'Enrollment successful', enrollment: savedEnroll });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all enrollments
const getEnrolls = async (req, res, next) => {
    try {
        const enrollments = await Enroll.find();
        res.status(200).json({ enrollments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get enrollments by learner ID
const getEnrollsById = async (req, res, next) => {
    try {
        const { learnerId } = req.params;
        const enrollments = await Enroll.find({ learner: learnerId });
        res.status(200).json({ enrollments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update enrollment by ID
const updateEnroll = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { learnerId, courseId } = req.body;

        // Check if the enrollment exists
        const enrollment = await Enroll.findById(id);
        if (!enrollment) throw new Error("Enrollment not found");

        // Update enrollment
        enrollment.learner = learnerId || enrollment.learner;
        enrollment.course = courseId || enrollment.course;

        const updatedEnroll = await enrollment.save();

        res.status(200).json({ message: 'Enrollment updated successfully', enrollment: updatedEnroll });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete enrollment by ID
const deleteEnroll = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the enrollment exists
        const deletedEnroll = await Enroll.findByIdAndDelete(id);
        if (!deletedEnroll) throw new Error("Enrollment not found");

        res.status(200).json({ message: 'Enrollment deleted successfully', enrollment: deletedEnroll });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    enroll,
    getEnrolls,
    getEnrollsById,
    updateEnroll,
    deleteEnroll
};
