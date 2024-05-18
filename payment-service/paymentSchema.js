// models/Payment.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String, // or ObjectId, depending on your user schema
    required: true,
  },
  courseId: {
    type: String, // or ObjectId, depending on your course schema
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
