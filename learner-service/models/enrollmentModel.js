const mongoose = require(`mongoose`);

const enrollSchema = new mongoose.Schema({
    learner: {
        type: String 
    },
    course : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    mobilenumber : {
        type: String,
        required: true
    }   
});

module.exports = mongoose.model('Enrollment', enrollSchema);
