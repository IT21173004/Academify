const Learner = require(`../models/leanerModel`);
const Instructor = require(`../models/instructorModel`);

// Function to get all learners
const getAllLearners = async (req, res, next) => {
    try {
        const learners = await Learner.find();
        res.status(200).json( learners );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all instructors
const getAllInstructors = async (req, res, next) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json({ instructors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLearners,
    getAllInstructors
};