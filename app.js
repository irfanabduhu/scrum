const path = require("path");
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "./config/config.env"});

const app = express();

// Logging
app.use(morgan("dev"));

// Set EJS as view engine
app.use(expressLayouts);
app.set("view-engine", "ejs");

// Spinning up the server
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.listen(
    PORT,
    console.log(`Server running on ${PORT}`)
)