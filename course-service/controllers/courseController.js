const Course = require('../models/courseModel');

// Add a new course
const addCourse = async (req, res, next) => {
    try {
        const {InstructorID, courseID, courseName, courseInstructor, courseDuration, courseDescription, coursePrice } = req.body;
        // Create a new course instance
        const newCourse = new Course({
            InstructorID,
            courseID,
            courseName,
            courseInstructor,
            courseDuration,
            courseDescription,
            coursePrice,
        });

        // Save the new course to the database
        await newCourse.save();
        
        // Send a success response with the new course details
        res.status(201).json(newCourse);
    } catch (err) {
        // Log any errors and send an error response
        console.error(err);
        res.status(500).json({ error: "Failed to create course" });
    }
};

// Get all courses
const getAllCourses = async (req, res, next) => {
    try {
        // Find all courses in the database
        const courses = await Course.find();
        // Send the list of courses as a JSON response
        res.json(courses);
    } catch (err) {
        // Log any errors
        console.error(err);
        // Send an error response
        res.status(500).json({ error: "Failed to fetch courses" });
    }
};

// Get a single course by its ID
const viewCourse = async (req, res, next) => {
    // Extract course ID from request parameters
    let courseId = req.params.id;
    
    try {
        // Attempt to find the course by its ID
        const course = await Course.findById(courseId);
        // Send the course details in the response
        res.status(200).send(course);
    } catch (err) {
        // Log any errors
        console.error(err.message);
        // Send an error response
        res.status(500).send({ status: "Error with getting course", error: err.message });
    }
};

// Update a course by its ID
const updateCourse = async (req, res, next) => {
    let courseId = req.params.id;
    const { courseName, courseInstructor, courseDuration, courseDescription, coursePrice } = req.body;

    const updateCourse = {
        courseName,
        courseInstructor,
        courseDuration,
        courseDescription,
        coursePrice
    };

    try {
        // Find the course by its ID and update it
        await Course.findByIdAndUpdate(courseId, updateCourse);
        // Send a success response
        res.status(200).send({ status: "Course updated" });
    } catch (err) {
        // Log any errors
        console.error(err);
        // Send an error response
        res.status(500).send({ status: "Error with updating course", error: err.message });
    }
};

// Delete a course by its ID
const deleteCourse = async (req, res, next) => {
    let courseId = req.params.id;

    try {
        // Find the course by its ID and delete it
        await Course.findByIdAndDelete(courseId);
        // Send a success response
        res.status(200).send({ status: "Course removed" });
    } catch (err) {
        // Log any errors
        console.error(err.message);
        // Send an error response
        res.status(500).send({ status: "Error with deleting course", error: err.message });
    }
};



// Get courses by InstructorID
const getCoursesByInstructor = async (req, res, next) => {
    let InstructorID = req.params.id;

    try {
        // Find all courses by InstructorID
        const courses = await Course.find({ InstructorID });
        // Send the list of courses as a JSON response
        res.json(courses);
    } catch (err) {
        // Log any errors
        console.error(err);
        // Send an error response
        res.status(500).json({ error: "Failed to fetch courses by instructor" });
    }
};



module.exports = {
    addCourse,
    getAllCourses,
    viewCourse,
    updateCourse,
    deleteCourse,
    getCoursesByInstructor
};
