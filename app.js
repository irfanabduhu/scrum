const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const sequelize = require("./config/database");

const app = express();

// Load config
dotenv.config({ path: "./config/config.env" });

// Logging
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "static")));

// Set EJS as view engine
// app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");

// Parsing the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "alpha beta gamma delta",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // one day
  })
);

// Routes
app.use("/board", require("./routes/board"));
app.use("/user", require("./routes/user"));
app.use("/task", require("./routes/task"));
app.use("/", require("./routes/index"));

// Models
require("./models/user");

const PORT = process.env.PORT;

// Build all models and spin up the server
sequelize
  .sync()
  .then(app.listen(PORT, console.log(`Server running on ${PORT}`)))
  .catch((err) => console.log(err));
