const express = require("express");

const stripe = require("stripe")(
  "sk_test_51PEWzvGQmroYacdzzS3SPq5A3I0ArnXKcPSvVgqF7TKbNv8vnd8X5J9ManmSgkmB4cZ3aniZMuVrWvLjkzSkt7Ej00oPt9YnYu"
);
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Get Repsonse from researcher");
  res.json({
    message: "it works",
  });
});

router.post("/pay", (req, res, next) => {
  console.log(req.body.token);
  const { token, amount } = req.body;
  const idempotencykey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: amount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      });
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
