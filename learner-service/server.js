const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
dotenv.config();

//Import Routes
const enrollRoute = require(`./routes/enrollRoutes`);


//Connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Route Middlewares 
app.use(`/enrollment`, enrollRoute);


const PORT = process.env.PORT || 5003;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));