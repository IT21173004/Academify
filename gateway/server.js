const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();
dotenv.config();

//Middleware
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});

app.use("/academify", proxy("http://localhost:5002")); //proxy to access user-service
app.use("/course", proxy("http://localhost:5005")); //proxy to access course-service

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));