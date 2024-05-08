const Learner = require(`../models/leanerModel`);
const Instructor = require(`../models/instructorModel`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const { registerValidation, loginValidation } = require(`../utils/validation`);

// user signUp controller
const signUp = async (req, res, next) => {
    const { role, name, email, password } = req.body;

    try {
        // Validation
        const { error } = registerValidation(req.body);
        if (error) throw new Error(error.details[0].message);

        // Check if the user is already in the database
        const emailExists = await Learner.findOne({ email }) || await Instructor.findOne({ email });
        if (emailExists) throw new Error("Email already exists");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        let newUser;
        if (role === 'learner') {
            newUser = new Learner({ role, name, email, password: hashedPassword });
        } else if (role === 'instructor') {
            newUser = new Instructor({ role, name, email, password: hashedPassword });
        } else {
            throw new Error("Invalid role");
        }

        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// user signIn controller
const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user is admin
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ role: 'admin', message: "Admin Auth successful", token });
    }

    // Check if the user exists in either learners or instructors
    const user = await Learner.findOne({ email }).lean() || await Instructor.findOne({ email }).lean();
    if (!user) return res.status(400).send("Email doesn't exist");

    // Check password
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) return res.status(400).send("Invalid password");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Auth successful", ...user, token });
};

// Read all learners and instructors
const getAllUsers = async (req, res, next) => {
    try {
        const learners = await Learner.find();
        const instructors = await Instructor.find();
        res.status(200).json({ learners, instructors });
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

// view user profile
const getUserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Search for the user in both collections
        let user = await Learner.findById(id);
        if(!user) {
            user = await Instructor.findById(id);
        }

        // Check if the user exists in either collection
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user based on which collection it was found in
        if (user) {
            return res.status(200).json(user);
        } 
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

// Update a user by ID
const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the ID belongs to a learner
        let user = await Learner.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedLeaner = await user.save();

            return res.status(200).json({
                message: 'Learner updated successfully',
                _id: updatedLeaner._id,
                name: updatedLeaner.name,
                email: updatedLeaner.email,
                password: updatedLeaner.password,
                role: updatedLeaner.role,
            });
        }

        // Check if the ID belongs to an instructor
        user = await Instructor.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedInstructor = await user.save();
            
            return res.status(200).json({
                message: 'Instructor updated successfully',
                _id: updatedInstructor._id,
                name: updatedInstructor.name,
                email: updatedInstructor.email,
                password: updatedInstructor.password,
                role: updatedInstructor.role,
            });
        }

        // If the ID does not belong to any user
        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the ID belongs to a learner
        let user = await Learner.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedLeaner = await user.save();

            return res.status(200).json({
                message: 'Learner updated successfully',
                _id: updatedLeaner._id,
                name: updatedLeaner.name,
                email: updatedLeaner.email,
                password: updatedLeaner.password,
                role: updatedLeaner.role,
            });
        }

        // Check if the ID belongs to an instructor
        user = await Instructor.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedInstructor = await user.save();
            
            return res.status(200).json({
                message: 'Instructor updated successfully',
                _id: updatedInstructor._id,
                name: updatedInstructor.name,
                email: updatedInstructor.email,
                password: updatedInstructor.password,
                role: updatedInstructor.role,
            });
        }

        // If the ID does not belong to any user
        return res.status(404).json({ message: 'User not found' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    signUp,
    signIn,
    getUserProfile,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    updateUser
};
