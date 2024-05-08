const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
dotenv.config();

//Import Routes
const authRoute = require(`./routes/authRoutes`);
const adminRoute = require(`./routes/adminRoutes`);

//Connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Route Middlewares 
app.use(`/user`, authRoute);
app.use(`/admin`, adminRoute);

const PORT = process.env.PORT || 5002;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));