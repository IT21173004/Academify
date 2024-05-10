const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
dotenv.config();

//Import Routes
const courseRoute = require(`./routes/courseRoutes`);

//Connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Route Middlewares 
app.use(`/instructor`, courseRoute);

const PORT = process.env.PORT || 5005;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));