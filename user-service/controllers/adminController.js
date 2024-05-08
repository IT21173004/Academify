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
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let user;

        // Check if the ID belongs to a learner or instructor
        user = await Learner.findById(id) || await Instructor.findById(id);

        if (user) {
            // Update user details
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            // Respond with updated user details
            return res.status(200).json({
                message: user instanceof Learner ? 'Learner updated successfully' : 'Instructor updated successfully',
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                password: updatedUser.password,
                role: updatedUser.role,
            });
        }

        // If the ID does not belong to any user
        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a user by ID
const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the user exists in the Learner collection
        let deletedUser = await Learner.findByIdAndDelete(id);

        // If not found in Learner collection, check Instructor collection
        if (!deletedUser) {
            deletedUser = await Instructor.findByIdAndDelete(id);
        }

        // If user doesn't exist in either collection, return error
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Read a single user by ID
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Search for the user in both collections
        const learner = await Learner.findById(id);
        const instructor = await Instructor.findById(id);

        // Check if the user exists in either collection
        if (!learner && !instructor) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user based on which collection it was found in
        if (learner) {
            return res.status(200).json(learner);
        } else {
            return res.status(200).json(instructor);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLearners,
    getAllInstructors,
    updateUserById,
    deleteUserById,
    getUserById
};