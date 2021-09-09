const path = require("path");
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env"});

// Connect to database
connectDB();

const app = express();

// Logging
app.use(morgan("dev"));

// Set EJS as view engine
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", require('./routes/index'));
app.use("/users", require("./routes/users"));


// Spinning up the server
const PORT = process.env.PORT;


app.listen(
    PORT,
    console.log(`Server running on ${PORT}`)
)