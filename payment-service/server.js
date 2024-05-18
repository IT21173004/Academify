const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
dotenv.config();

//Connect to DB
connectDB();

const striperoutes = require("./Routes/stripe-route");

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/stripe", striperoutes);

const PORT = process.env.PORT || 3500;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
