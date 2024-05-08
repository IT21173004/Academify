const mongoose = require(`mongoose`);

const instructorSchema = new mongoose.Schema({
    role: {
        type: String // Default role set to 'instructor'
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true,
        min: 8
    }
       
});

module.exports = mongoose.model('Instructor', instructorSchema);